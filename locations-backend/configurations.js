module.exports = function() {
	this.port = 8989;
	this.logsFolder = '/tmp/wintego_logs';
	this.cryptKey = 'abcdef987!';
	this.maxIdleTime = 60 * 60 * 1000; /* one hour in ms */
	this.timeForCrone = 30;
	this.dbServer = 'localhost';
	this.dbUser = 'admin';
	this.dbName = 'wintego'
	this.dbPassword = 'benAdmin11!';
}
