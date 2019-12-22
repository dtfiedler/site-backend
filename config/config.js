

require('dotenv').config();
const host = process.env.NODE_ENV === 'development' ? 'localhost': '0.0.0.0';

/**
 * Default configurations for the server.
 * 
 * Reference: https://hapi.dev/api/?v=18.4.0#-serveroptions
 */
module.exports = {
    port: process.env.PORT || 5000,
    host,
    routes: {
        cors: true
    }
}