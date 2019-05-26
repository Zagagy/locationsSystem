var crypto = require('crypto');

module.exports = {
	getHash : function(pass,config) {
		let retVal = pass + config['cryptKey'];
		retVal = crypto.createHash('md5').update(retVal).digest("hex");
		return retVal;
	},

	getSessionToken : function() {
		return "someToken";
	}
}