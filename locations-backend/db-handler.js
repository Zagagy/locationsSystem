var crypto = require('crypto');
var mysqlDriver = require('mysql2/promise');

module.exports = {
	conf : null,
	db : null,
	log : null,
	connection : null,

	init : function(logHandler,configurations) {
		this.conf = configurations;
		this.log = logHandler;
		this.connection = this.connectToDB();
	},

	connectToDB : async function() {
		let dbOptions = {
		  host     : this.conf['dbServer'],
		  user     : this.conf['dbUser'],
		  password : this.conf['dbPassword'],
		  database : this.conf['dbName']
		};
		let connection = await mysqlDriver.createConnection(dbOptions).then( connection => {

		  console.log('CONNETED to DB');
		  this.connection = connection;
		});
	},

	verifyLogin : async function(user,pass) {
		let query = "SELECT password FROM users where username="+mysqlDriver.escape(user)+";"; //escape to prevent sql injections
		let [rows, fields] = await this.connection.execute(query);
		if (rows.length>0)
		{
			this.log.info('User Exists in DB - verifying Password');
			let isPasswordCorrect = rows[0]['password'] == pass;
			this.log.info('is password correct: ' + isPasswordCorrect);
			return isPasswordCorrect;
		} else	{
			this.log.info('User does not Exists in DB');
			return false;
		}
	},

	getUserSpecificData : async function(user) {
		let queryLocations = "SELECT latitude,longitude,comment FROM locations where user_id=(SELECT id FROM users WHERE username="+mysqlDriver.escape(user)+");"; //escape to prevent sql injections
		let queryTheme = "SELECT theme FROM users WHERE username="+mysqlDriver.escape(user)+";"; //escape to prevent sql injections

		let [rowsFromLocations, fieldsLocations] = await this.connection.execute(queryLocations);
		let [rowsFromTheme, fieldsTheme] = await this.connection.execute(queryTheme);
		let retVal = { 'locations' : [] , 'theme' : "standard"};
		
		if (rowsFromLocations.length>0)
		{
			this.log.info('User Found ' + rowsFromLocations.length + ' location to be sent to the user;' );
			for (let i=0;i<rowsFromLocations.length;i++) {
				this.log.info(rowsFromLocations[i]);
			}
			retVal['locations'] = rowsFromLocations;
		} else	{
			this.log.info('User doesnt have any saved locations');
		}

		if (rowsFromTheme.length>0) {
			retVal['theme'] = rowsFromTheme[0]['theme'];
		}
		else {
			this.log.info('User doesnt have a customized theme');
		}
		return retVal;

	},

	removeLocationFromUser : async function(data,user) {
		let lat = data['latitude'];
		let lon = data['longitude'];
		let query = "DELETE from locations WHERE latitude="+mysqlDriver.escape(lat)+" and longitude="+mysqlDriver.escape(lon)+";";  //escape to prevent sql injections
		this.log.info(query);
		this.log.info('Deleting specific location selected by user: ' + user + ' resulted in: ' + JSON.stringify(rows));
		let [rows, fields] = await this.connection.execute(query);
		if (rows['affectedRows']>0)
		{
			this.log.info('Delete operation was successfull');
			return true;
		} else	{
			this.log.warn('Delete operation failed');
			return false;
		}
	},

	addLocationToUser : async function(data,user) {
		retVal = false;
		let userIdQuery = "SELECT id FROM users WHERE username="+mysqlDriver.escape(user)+";";  //escape to prevent sql injections
		let [rowsForUserIdQuery, fieldsForUserIdQuery] = await this.connection.execute(userIdQuery);
		if (rowsForUserIdQuery.length>0)
		{
			this.log.info('User ID from users table retrieved, now inserting to locations table');
			let lat = mysqlDriver.escape(data['latitude']);
			let lon = mysqlDriver.escape(data['longitude']);
			let comment = mysqlDriver.escape(data['comment']);
			let id = mysqlDriver.escape(rowsForUserIdQuery[0]['id']);
			let insertionQuery = "INSERT INTO locations (user_id, latitude, longitude,comment) VALUES (" +id+ ", " + lat + "," + lon + "," + comment + ");"; 
			this.log.info(insertionQuery);
			let [rows, fields] = await this.connection.execute(insertionQuery);
			if (rows['affectedRows']>0)
			{
				this.log.info('Insertion operation was successfull');
				retVal = true;
			} else	{
				this.log.warn('Insertion operation failed');
				retVal = false;
			}
		}
		return retVal;
	},

	changeThemeForUser : async function (data,user) {
		let query = "UPDATE users SET theme="+mysqlDriver.escape(data)+" WHERE username="+mysqlDriver.escape(user)+";"; //escape to prevent sql injections
		this.log.info(query);
		let [rows, fields] = await this.connection.execute(query);
		this.log.info('Changing theme for user ' + user + ' resulted in: ' + JSON.stringify(rows));
		if (rows['changedRows']>0)
		{
			this.log.info('Theme Successfully Updated');
			return true;
		} else	{
			this.log.warn('Cannot update Theme');
			return false;
		}
	}
}