'use strict';

const hapi = require('hapi');
const config = require('./config/config');
const routes = require('./config/routes');

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

    /**
     * Start the server.
     */
    await server.start();
    console.log('Server running on %s', server.info.uri);
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