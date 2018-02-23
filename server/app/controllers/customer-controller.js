
let BaseController = require('./base-controller');
let CustomerModel = require('../models/customer-model');
var redis = require('redis');


class CustomerController extends BaseController {
    constructor() {
        super();

    }

    getCustomers() {
        let customersPromise = CustomerModel.getCustomers(null);
        return customersPromise;
    }
    getCustomerById(id) {

        let cachedData = this.getCachedInfo(id);

        if (!!cachedData && cachedData.length > 0) {

            console.log("getting data from cache");

            return Promise.resolve(cachedData);
        } else {
            return CustomerModel.getCustomerById(id);
        }
    }

    getCachedInfo(id) {
        return [
            {
                "id": 1,
                "Customer Name": "FMW",
                "Customer Email": "arehman@folio3.com"
            }
        ];
    }
}

module.exports = new CustomerController();