var express = require('express');
var app = express();
var bodyParser  = require('body-parser');
var configData = require('./configurations.js');
var config = new configData();
var cors = require('cors');
var securityHandler = require('./security-handler.js');
var dbHandler = require('./db-handler.js');
var resultsHandler = require('./results-handler.js');
const session = require('express-session');
const redis = require('redis');
var jwt = require('jsonwebtoken');
const redisStore = require('connect-redis')(session);
var log;


function init() {
	console.log("Configurations loaded:\n"+JSON.stringify(config) + "\n");
	handleLogging();
	handleHttpRequests();
	securityHandler.init(log,config);
	dbHandler.init(log,config);
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
		try {
		    let user = req.body.username;
		    let password = req.body.password;
		    let browser = req.body.browser;
		    let ip = req.ip || req.connection.remoteAddress;
		    ip = ip.replace('::ffff:', '');
		    log.info('** New Connection from: user:' + user + ", password:" + password.replace(/./g, '*') + ", ip:" + ip + ", browser:" + browser);
		    let hashedPassword = securityHandler.getHash(password,config);
		    if (dbHandler.verifyLogin(user,hashedPassword)) {
		    	let sessionToken = securityHandler.generateSessionToken();
		    	securityHandler.handleNewUser(user,sessionToken);
				log.info('** Successfull Login by user ' + user + ' , given token: ' + sessionToken);
		    	return resultsHandler.handleSuccessfullLogin(user,sessionToken,res);
			}
			else {
				log.warn('** Failed Login by user ' + user);
		    	return resultsHandler.handleFailedAction(res);
			}
		} catch(ex) {
				log.error('** Exception during login - ' + ex);
				log.error('** Exception during login - data from the user: ' + req.body);
		}
	});

	app.post ('/insert',bodyParser.json(), (req, res) => {
		try {
		    let token = req.body.token;
		    let data = req.body.data;
			log.info('** user with token: ' + token + ' tries to insert the following location to db: ' + JSON.stringify(data));
		    let user = securityHandler.getUser(token);
		    if (user != null) {
				log.info('** user ' + user + ' with token: ' + token + ' passed security check');
		    	if (dbHandler.addLocationToUser(data,user)) {
					log.info('** user ' + user + ' added new Location to DB');
		    		return resultsHandler.handleSuccessfullAction(res);
		    	}
		    	else {
					log.warn('** Failed inserting new location to DB by ' + user);
		    		return resultsHandler.handleFailedAction(res);
		    	}
		    }
		}
		catch(ex) {
				log.error('** Exception during insert - ' + ex);
				log.error('** Exception during insert - data from the user: ' + req.body);
		}
	});

	app.post ('/remove',bodyParser.json(), (req, res) => {
		try {
		    let token = req.body.token;
		    let data = req.body.data;
			log.info('** user with token: ' + token + ' tries to remove the following location from his db: ' + JSON.stringify(data));
		    let user = securityHandler.getUser(token);
		    if (user != null) {
				log.info('** user ' + user + ' with token: ' + token + ' passed security check');
		    	if (dbHandler.removeLocationFromUser(data,user)) {
					log.info('** user ' + user + ' removed a Location from the DB');
		    		return resultsHandler.handleSuccessfullAction(res);
		    	}
		    	else {
					log.warn('** Failed inserting new location to DB by ' + user);
		    		return resultsHandler.handleFailedAction(res);
		    	}
		    }
	    	else {
				log.warn('** Failed Authentication for ' + user);
	    		return resultsHandler.handleFailedAction(res);
	    	}
    	} catch(ex) {
				log.error('** Exception during remove - ' + ex);
				log.error('** Exception during remove - data from the user: ' + req.body);
		}
	});

	app.post ('/updateTheme',bodyParser.json(), (req, res) => {
		try {
		    let token = req.body.token;
		    let data = req.body.data;
			log.info('** user with token: ' + token + ' tries to update his preffered theme to: ' + JSON.stringify(data));
		    let user = securityHandler.getUser(token);
		    if (user != null) {
				log.info('** user ' + user + ' with token: ' + token + ' passed security check');
		    	if (dbHandler.changeThemeForUser(data,user)) {
					log.info('** user ' + user + ' updated his theme in the DB');
		    		return resultsHandler.handleSuccessfullAction(res);
		    	}
		    	else {
					log.warn('** Failed changing Theme for ' + user);
		    		return resultsHandler.handleFailedAction(res);
		    	}
		    }
	    	else {
				log.warn('** Failed Authentication for ' + user);
	    		return resultsHandler.handleFailedAction(res);
	    	}
    	} catch(ex) {
				log.error('** Exception during updateTheme - ' + ex);
				log.error('** Exception during updateTheme - data from the user: ' + req.body);
		}
	});

	app.post ('/logout',bodyParser.json(), (req, res) => {
		try {
		    let token = req.body.token;
			log.info('** user with token: ' + token + ' is logging out');
		    let user = securityHandler.getUser(token);
		    if (user != null) {
				log.info('** user ' + user + ' with token: ' + token + ' passed security check');
		    	if (securityHandler.handleUserLogut(token)) {
					log.info('** user ' + user + ' was successuflly logged out of the system');
		    		return resultsHandler.handleSuccessfullAction(res);
		    	}
		    	else {
					log.warn('** Failed authenticate ' + user + ' logout will be time based.');
		    		return resultsHandler.handleFailedAction(res);
		    	}
		    }
	    	else {
					log.warn('** Failed authenticate ' + user + ' logout will be time based.');
	    		return resultsHandler.handleFailedAction(res);
	    	}
	    } catch(ex) {
				log.error('** Exception during logout - ' + ex);
				log.error('** Exception during logout - data from the user: ' + req.body);
		}
	});


	app.listen(config['port']);
	log.info('Server started! on port: ' + config['port']);
}

init();