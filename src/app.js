'use strict';

const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');

const server = require('../config/server');
const baseRouter = require('./routes');

const init = async () => {

    const swaggerOptions = {
        "info": {
            "title": "Swagger - FX Rates",
            "description": "Generated with documentation dinamyc created by Facundo Ferrari.",
            "version": "1.0.0"
        },
        schemes: ['http']
    }

    // Adding plugins for swagger docs;
    await server.register([
        Inert,
        Vision,
        {
            plugin:HapiSwagger,
            options:swaggerOptions
        }
    ])

    await server.register(baseRouter,{
		routes:{
			prefix:'/v1'
		}
	});

    server.events.on('response', function (request) {
        console.log(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.path + ' --> ' + request.response.statusCode);
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();