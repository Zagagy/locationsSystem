var crypto = require('crypto');
var mysqlDriver = require('mysql');

module.exports = {
	log : null,
	conf : null,
	db : null,
	connection : null,

	init : function(logsHandler,configurations) {
		this.log = logsHandler;
		this.conf = configurations;
		this.connection = this.connectToDB();

	},

	connectToDB : function() {
		let mysql      = require('mysql');
		let dbOptions = {
		  host     : this.conf['dbServer'],
		  user     : this.conf['dbUser'],
		  password : this.conf['dbPassword'],
		};
		this.connection = mysql.createConnection(dbOptions);

		this.connection.connect(function(err) {
		  if (err) {
		    this.log.error('error connecting to db: ' + err.stack);
		    return;
		  }

		  this.log.info('CONNETED to DB, connected as id ' + connection.threadId);
		}.bind(this));

	},

	verifyLogin : function(user,pass) {
		return user == 'ben';
	},

	getLocations : function(user) {
		retVal = [
			      {longitude: '32.778919', latitude: '34.986706', comment: 'loc1'},
			      {longitude: '32.783649', latitude: '34.965015', comment: 'test2'},
			      {longitude: '51.556023', latitude: '-0.279519', comment: 'someplace3'},
			      {longitude: '53.463058', latitude: '-2.291340', comment: 'd4'},
			      {longitude: '53.430935', latitude: '-2.960724', comment: 'd5'},
			      {longitude: '53.430935', latitude: '-2.960724', comment: 'd6'}
			    ];
		return retVal;
	},

	removeLocationFromUser : function(data,user) {
		return true;
	},

	addLocationToUser : function(data,user) {
		return true;
	},

	changeThemeForUser : function (data,user){
		return true;
	}
}