let BaseController = require('./base-controller');
let CustomerService = require('../service/customer-service');
var redis = require('redis');


class CustomerController extends BaseController {
    constructor() {
        super();

    }

    getCustomers() {
        let customersPromise = CustomerService.getCustomers(null);
        return customersPromise;
    }
    getSpecificCustomer(id) {
        return CustomerService.getSpecificCustomer(id);
    }

    addCustomer(customerObject) {
        let customersPromise = CustomerService.addCustomer(customerObject);
        return customersPromise;
    }

    getTotalCustomer() {
        let customersPromise = CustomerService.getTotalCustomer();
        return customersPromise;
    }

    getCachedInfo(id) {
        return [{
            "id": 1,
            "Customer Name": "FMW",
            "Customer Email": "arehman@folio3.com"
        }];
    }
}

module.exports = new CustomerController();