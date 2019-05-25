var express = require('express');
var app = express();
var bodyParser  = require('body-parser');
var configData = require('./configurations.js');
var config = new configData();
var cors = require('cors')
var log;


function init() {
	console.log("Configurations loaded:\n"+JSON.stringify(config) + "\n");
	handleLogging();
	handleHttpRequests();
}

function handleLogging() {
	const logs_options = {
	errorEventName:'error',
        logDirectory: config['logsFolder'],
        fileNamePattern:'roll-<DATE>.log',
        dateFormat:'YYYY.MM.DD'
	};
	log = require('simple-node-logger').createRollingFileLogger( logs_options );
}

function handleHttpRequests() {
	app.set('trust proxy', true);
	app.use(cors());
	app.use(bodyParser.text({ type: 'text/html' }));
	app.use(bodyParser.text({ type: 'text/xml' }));
	app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
	app.use(bodyParser.json({ type: 'application/*+json' }));

	app.post('/login',bodyParser.json(), (req, res) => {
	    let user = req.body.username;
	    let password = req.body.password;
	    let browser = req.body.browser;
	    let ip = req.ip || req.connection.remoteAddress;
	    ip = ip.replace('::ffff:', '');

	    log.info('** New Connection from: user:' + user + ", password:" + password.replace(/./g, '*') + ", ip:" + ip + ", browser:" + browser);
	    let answer = JSON.stringify({'msg' : 'Received a POST HTTP method'});
	  	return res.send(answer);
	});

	app.listen(config['port']);
	log.info('Server started! At http://127.0.0.1:' + config['port']);
}

init();