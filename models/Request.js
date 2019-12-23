class Request {
    /**
     * Creates a new instance with timestamp of when created.
     * @param {*} id 
     * @param {*} latitude 
     * @param {*} longitude 
     * @param {*} dateRequested 
     */
    constructor(latitude, longitude, dateRequested){
        Object.assign(this, { latitude, longitude, dateRequested,  timestamp: new Date()});
    }
}

module.exports = Request;