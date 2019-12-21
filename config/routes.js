
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/weather';
const WEATHER_BASE_URL = '/api/weather'
/**
 * Routes for the given service.
 * 
 * Note: In Hapi v17, the reply interface isn’t available 
 * anymore and you can return values from route handlers directly.
 */
module.exports = [
    /**
     * Generic endpoint.
     */
    {
        method: 'GET',
        path: `${WEATHER_BASE_URL}/history`,
        handler: function (request, h) {
            MongoClient.connect(url, function(err, db) {
                var results = db.collection('weather').find();
                res.send(results);
                db.close();
            });
            return;
        }
    },
     /**
     * Default route to handle retriveving weather information.
     */
    {
        method: 'GET', 
        path: `${WEATHER_BASE_URL}/recent`, 
        handler: (request, h) => {
            /**
             * Retrieve most recent lookups.
             */
            return h
            .response('recent weather lookups')
            .code(201)
        } 
    },
    /**
     * Default route to handle retriveving weather information.
     */
    {
        method: 'POST', 
        path: `${WEATHER_BASE_URL}/save`, 
        handler: (request, h) => {
            /**
             * Save weather details for a specific lat, long, and day.
             */
            return h
            .response('save weather data')
            .code(201)
        } 
    }
]
