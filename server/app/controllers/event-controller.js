let BaseController = require('./base-controller');
let EventService = require('../service/event-service');
var redis = require('redis');


class EventController extends BaseController {
    constructor() {
        super();

    }

    getItems() {
        let itemPromise = EventService.getItems(null);
        return itemPromise;
    }

    getItemsCategories() {
        let itemPromise = EventService.getItemCategories(null);
        return itemPromise;
    }

    createEvent(eventObject) {
        let itemPromise = EventService.addEvent(eventObject);
        return itemPromise;
    }

    getItemById(id) {

        let cachedData = this.getCachedInfo(id);

        if (!!cachedData && cachedData.length > 0) {

            console.log("getting data from cache");

            return Promise.resolve(cachedData);
        } else {
            return EventService.getCustomerById(id);
        }
    }

    getCachedInfo(id) {
        return [{
            "id": 1,
            "Customer Name": "FMW",
            "Customer Email": "arehman@folio3.com"
        }];
    }
}

module.exports = new EventController();