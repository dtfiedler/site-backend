
require('dotenv').config();

var MongoClient = require('mongodb').MongoClient;
var MONGODB_URL = process.env.MONGODB_URL;
const WEATHER_BASE_URL = '/api/weather';

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const CONNECTION_URL = `mongodb://${DB_USER}:${DB_PASSWORD}@${MONGODB_URL}`

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
        path: `/`,
        handler: async (request, h) => h.response('SITE Technologies Backend Service')
    },
    /**
     * Endpoint to retrieve all weather data.
     */
    {
        method: 'GET',
        path: `${WEATHER_BASE_URL}/history`,
        handler: async (request, h) => {
            try {
                const client = await MongoClient.connect(CONNECTION_URL);
                const db = client.db(DB_NAME);
                const collection = db.collection('weather');
                return collection.find().toArray();
            } catch(e){
                console.log(e);
                return h.response(e).status(300);
            }
        }
    },
     /**
     * Default route to handle retriveving weather information.
     */
    {
        method: 'GET', 
        path: `${WEATHER_BASE_URL}/save/{lat}/{long}/{date}`, 
        handler: async (request, h) => {
            try {
                const { lat, long, date } = request.params;
                const client = await MongoClient.connect(CONNECTION_URL);
                const db = client.db(DB_NAME);
                const result = await db.collection('weather').insertOne({timestamp: new Date(), latitude: lat, longitude: long, dateRequested: date});
                return h.response(result);
            } catch(e){
                console.log(e);
                return h.response(e).status(300);
            }
        } 
    }
]
