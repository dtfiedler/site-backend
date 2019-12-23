'use strict';

const hapi = require('hapi');
const config = require('./config/config');
const routes = require('./config/routes');
const hapiSwagger = require('hapi-swagger');
const vision = require('vision');
const inert = require('inert');
/**
 * Intialize server.
 */
const init = async () => {
    /**
     * Configure server
     */
    const server = hapi.server(config);

    /**
     * Expose endpoints.
     */
    server.route(routes);

    try {
        /**
         * Register packages.
         */
        await server.register([
            inert,
            vision,
            {
                name: 'Hapi Swagger',
                plugin: hapiSwagger,
                options: {
                    info: {
                        title: 'API Endpoints',
                        description: 'API documentation for my service',
                        version: '1.0',
                    }
                }
            }
        ]);
        /**
         * Start the server.
         */
        await server.start();
        console.log('Server running on %s', server.info.uri);
    } catch(e){
        console.log('Failed to start server: %s', e);
    }
};

/**
 * Handle invalid routes.
 */
process.on('unhandledRejection', (err) => {
    console.log(err);
});

/**
 * Run application on start.
 */
init();