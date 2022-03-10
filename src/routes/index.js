const rates = require('../apiServices/rates/routes');

module.exports = {
	name:'base-route',
	version:'1.0.0',
	register:(server,options)=>{
		server.route(rates);
	}
}
