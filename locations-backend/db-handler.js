var crypto = require('crypto');
var mysqlDriver = require('mysql2/promise');

module.exports = {
	conf : null,
	db : null,
	log : null,
	pool : null,

	init : function(logHandler,configurations) {
		this.conf = configurations;
		this.log = logHandler;
		let dbOptions = {
		  host     : this.conf['dbServer'],
		  user     : this.conf['dbUser'],
		  password : this.conf['dbPassword'],
		  database : this.conf['dbName']
		};
		this.pool = mysqlDriver.createPool(dbOptions);
	},



	verifyLogin : async function(user,pass,handler) {
		const connection = await this.pool.getConnection();
		let query = "SELECT password FROM users where username="+mysqlDriver.escape(user)+";"; //escape to prevent sql injections
		this.pool.query(query, (ex, rows) => {
			let queryResult = false;
			if (rows.length>0)
			{
				this.log.info('User Exists in DB - verifying Password');
				let isPasswordCorrect = rows[0]['password'] == pass;
				this.log.info('is password correct: ' + isPasswordCorrect);
				queryResult = isPasswordCorrect;
			}
			handler(queryResult);
		});
	},

	getUserSpecificData : async function(user,handler) {
		let queryLocations = "SELECT latitude,longitude,comment FROM locations where user_id=(SELECT id FROM users WHERE username="+mysqlDriver.escape(user)+");"; //escape to prevent sql injections
		let queryTheme = "SELECT theme FROM users WHERE username="+mysqlDriver.escape(user)+";"; //escape to prevent sql injections

		this.pool.query(queryLocations, (exFromLocations, rowsFromLocations) => {
			this.pool.query(queryTheme, (exFromTheme, rowsFromTheme) => {
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
				handler(retVal);
			});
		});
	},

	addLocationToUser : async function(data,user,handler) {
		retVal = false;
		let userIdQuery = "SELECT id FROM users WHERE username="+mysqlDriver.escape(user)+";";  //escape to prevent sql injections
		this.pool.query(userIdQuery, (exFromUserIdQuery, rowsForUserIdQuery) => {
			this.log.info('User ID from users table retrieved, now inserting to locations table');
			let lat = mysqlDriver.escape(data['latitude']);
			let lon = mysqlDriver.escape(data['longitude']);
			let comment = mysqlDriver.escape(data['comment']);
			let id = mysqlDriver.escape(rowsForUserIdQuery[0]['id']);
			let insertionQuery = "INSERT INTO locations (user_id, latitude, longitude,comment) VALUES (" +id+ ", " + lat + "," + lon + "," + comment + ");"; 
			this.log.info(insertionQuery);
			this.pool.query(insertionQuery, (exForAddQuery, rowsForAddQuery) => {
				if (rowsForAddQuery['affectedRows']>0)
				{
					this.log.info('************ Insertion operation was successfull');
					retVal = true;
				} else	{
					this.log.warn('************ Insertion operation failed');
					retVal = false;
				}
				handler(retVal);
			});
		});
	},


	removeLocationFromUser : async function(data,user,handler) {
		let userIdQuery = "SELECT id FROM users WHERE username="+mysqlDriver.escape(user)+";";  //escape to prevent sql injections
		this.pool.query(userIdQuery, (exForUserId, rowsForUserIdQuery) => {
			if (rowsForUserIdQuery.length>0)
			{
				this.log.info('User ID from users table retrieved, now removing location from table');
				let id = mysqlDriver.escape(rowsForUserIdQuery[0]['id']);
				let lat = mysqlDriver.escape(data['latitude']);
				let lon = mysqlDriver.escape(data['longitude']);
				let query = "DELETE from locations WHERE latitude="+lat+" and longitude="+lon+" and user_id="+id+";";  //escape to prevent sql injections
				this.log.info(query);

				this.pool.query(query, (ex, rows) => {
					let isSuccess = false;
					console.log(JSON.stringify(rows))
					if (rows['affectedRows']>0)
					{
						this.log.info('Deleting specific location selected by user: ' + user + ' resulted in: ' + JSON.stringify(rows));
						this.log.info('************ Delete operation was successfull');
						isSuccess = true;
					} else	{
						this.log.warn('************ Delete operation failed');
						isSuccess = false;
					}
					handler(isSuccess);
				});
			}
		});
	},

	changeThemeForUser : async function (data,user,handler) {
		let query = "UPDATE users SET theme="+mysqlDriver.escape(data)+" WHERE username="+mysqlDriver.escape(user)+";"; //escape to prevent sql injections
		this.log.info(query);
		this.pool.query(query, (ex, rows) => {
			let isSuccess = false;
			this.log.info('Changing theme for user ' + user + ' resulted in: ' + JSON.stringify(rows));
			if (rows['changedRows']>0)
			{
				this.log.info('Theme Successfully Updated');
				isSuccess = true;
			} else	{
				this.log.warn('Cannot update Theme');
				isSuccess = false;
			}
			handler(isSuccess);
		});
	}
}