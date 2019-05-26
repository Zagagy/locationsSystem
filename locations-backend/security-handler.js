var crypto = require('crypto');
var uuidv1 = require('uuid/v1');
var cron = require('node-cron');
const MAX_IDLE_TIME = 60 * 60 * 1000; /* one hour in ms */

module.exports = {
	sessionsListByToken : {},
	usersLoginOrder : [],
	log : null,
	conf : null,

	init : function(logsHandler,configurations) {
		this.log = logsHandler;
		this.conf = configurations;
		this.log.info('** Security Handler Initialized');
		cron.schedule('*/' + this.conf['timeForCrone'] + ' * * * *', () => {
		  this.log.info('** starting crone scheduler');
		  let currTime = new Date();
		  // Running task every 30 minutes to clean local dictionary from idle users:
		  for (let i=0;i<usersLoginOrder.length;i++) {
		  	let token = usersLoginOrder[i];
		  	let lastSeen = this.sessionsListByToken[token]['lastSeen'];
		  	let user = this.sessionsListByToken[token]['user']; 
		  	if ((currTime - lastSeen) > this.conf['maxIdleTime']) {
				this.log.warn('** last seen time of user ' + user + ' (token: '+token+' ) is more than the maximum idle time - force logout');
				handleUserLogut(token);
		  	}
		  	else {
				this.log.info('** crone is done after checking ' + i + ' users.');
		  		break;
		  	}
		  }
		  this.log.info('** crone is done until next round.');
		});
	},

	getHash : function(pass,config) {
		let retVal = pass + config['cryptKey'];
		retVal = crypto.createHash('md5').update(retVal).digest("hex");
		this.log.info('** New Hash for Password was generated: ' + retVal);
		return retVal;
	},

	generateSessionToken : function() {
		let retVal = uuidv1();
		this.log.info('** New token was generated: ' + retVal);
		return retVal;
	},

	handleUserLogut : function(token) {
		let indexInOrderArray = this.usersLoginOrder.indexOf(token);
		this.removeFromList(token);
		this.log.info('** Token ' + token + ' removed from usersLoginOrder');
		if (sessionsListByToken[token]) {
			delete sessionsListByToken[token];
			this.log.info('** Token ' + token + ' removed from sessionsListByToken dictionary');
		}
		return true;
	},

	getUser : function(token) {
		let retVal = null;
		if (this.sessionsListByToken[token]) {
			retVal = this.sessionsListByToken[token]['user'];
			this.log.info('** Token ' + token + ' found, it indicates user: ' + retVal);
			updateNewRequestTimes(token);
		}
		else {
			this.log.warn('** Token ' + token + ' was not found');
		}
		return retVal;
	},

	handleNewUser : function (user,token) {
		this.log.info('** Initializing user list & dictionary for user ' + user);
		let currTime = new Date();
		this.sessionsListByToken[token] = {'user' : user, 'lastSeen' : currTime};
		removeFromList(token);
		this.usersLoginOrder.push(token);
	},

	removeFromList(token) {
		this.log.info('** Remove token(if exists) ' + token + ' from ordered list');
		let indexInOrderArray = this.usersLoginOrder.indexOf(token);
		if (indexInOrderArray !== -1) {
			this.usersLoginOrder.splice(indexInOrderArray,1);
		}		
	},

	updateNewRequestTimes(token) {
		this.log.info('** Updating new times for token ' + token);
		if (this.sessionsListByToken[token]) {
			let currTime = new Date();
			this.sessionsListByToken[token]['lastSeen'] =  currTime;
		}
		this.removeFromList(token);
		this.usersLoginOrder.push(token);
	}
}