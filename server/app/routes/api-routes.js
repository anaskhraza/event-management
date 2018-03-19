let express = require("express");
let router = express.Router();
let customerController = require('../controllers/customer-controller');
let itemController = require('../controllers/item-controller');
let eventController = require('../controllers/event-controller');

router.get('/customers', function(req, res) {
    let customer = new customerController();
    customer.getCustomers().then((response) => {
        res.json(response);
    }).catch(function(err) {
        console.log(err);
    });

});

router.get('/customer/:id', function(req, res) {
    let id = req.param('id');
    console.log("Customer Id Requested", id);
    customerController.getCustomerById(id).then((response) => {
        res.json(response);
    }).catch(function(err) {
        console.log(err);
        res.json({ error: err });
    });

});

router.post('/addEvent', function(req, res) {
    console.log("heelo" + req.body);
    eventController.createEvent(req).then((response) => {
        res.json(response);
    });

});

router.get('/items', function(req, res) {

    itemController.getItems().then((response) => {
        res.json(response);
    });

});

router.get('/itemscategory', function(req, res) {

    itemController.getItemsCategories().then((response) => {
        res.json(response);
    });

});

module.exports = router;