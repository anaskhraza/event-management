let BaseController = require('./base-controller');
let ItemService = require('../service/item-service');
var redis = require('redis');


class ItemController extends BaseController {
    constructor() {
        super();

    }

    getItems() {
        let itemPromise = ItemService.getItems(null);
        return itemPromise;
    }

    createItem(eventObject) {
        let itemPromise = ItemService.addItem(eventObject);
        return itemPromise;
    }

    updateItem(eventObject) {
        let itemPromise = ItemService.updateItem(eventObject);
        return itemPromise;
    }


    getSelectedItemQuantity(dateStart, dateEnd) {
        console.log("www" + dateEnd);
        let itemPromise = ItemService.getSelectedItemQuantity(dateStart, dateEnd);
        return itemPromise;
    }

    getItemsCategories() {
        let itemPromise = ItemService.getItemCategories(null);
        return itemPromise;
    }

    getItemById(id) {

        let cachedData = this.getCachedInfo(id);

        if (!!cachedData && cachedData.length > 0) {

            console.log("getting data from cache");

            return Promise.resolve(cachedData);
        } else {
            return CustomerService.getCustomerById(id);
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

module.exports = new ItemController();