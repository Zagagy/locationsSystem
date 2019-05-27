var crypto = require('crypto');
var dbHandler = require('./db-handler.js');

module.exports = {
	handleSuccessfullLogin : function(user,sessionToken,res) {
		let handler = function(locations) {
			let answer = JSON.stringify({'isSuccess' : true, 'content' : locations, 'token' : sessionToken, 'isIdledAndLoggedOut' : false });
	  		return res.send(answer);
		}.bind(this);
		let userDataFunc = dbHandler.getUserSpecificData(user,handler);
	},

	handleSuccessfullAction : function(res) {
		let answer = JSON.stringify({'isSuccess' : true, 'isIdledAndLoggedOut' : false});
	  	return res.send(answer);
	},

	handleFailedAction : function(res) {
		let answer = JSON.stringify({'isSuccess' : false, 'isIdledAndLoggedOut' : false});
	  	return res.send(answer);
	},

	handleIdleLoggedOut : function(res) {
		let answer = JSON.stringify({'isSuccess' : false, 'isIdledAndLoggedOut' : true});
	  	return res.send(answer);
	}
}