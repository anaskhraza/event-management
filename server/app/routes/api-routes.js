let express = require("express");
let router = express.Router();
let customerController = require('../controllers/customer-controller');
let projectController = require('../controllers/project-controller');


router.get('/customers', function (req, res) {

    customerController.getCustomers().then((response) => {
        res.json(response);
    }).catch(function (err) {
        console.log(err);
    });

});

router.get('/customer/:id', function (req, res) {
    let id = req.param('id');
    console.log("Customer Id Requested",id);
    customerController.getCustomerById(id).then((response) => {
        res.json(response);
    }).catch(function (err) {
        console.log(err);
        res.json({ error: err });
    });

});

router.get('/projects', function (req, res) {

    projectController.getProjects().then((response) => {
        res.json(response);
    });

});

module.exports = router;
