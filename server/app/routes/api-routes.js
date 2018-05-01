let express = require("express");
var app = express();
let router = express.Router();
let customerController = require('../controllers/customer-controller');
let itemController = require('../controllers/item-controller');
let eventController = require('../controllers/event-controller');
let bodyParser = require('body-parser');
var _ = require('lodash');
var moment = require('moment');

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

router.get('/customers', function(req, res) {
    let customer = new customerController();
    customer.getCustomers().then((response) => {
        res.json(response);
    }).catch(function(err) {
        console.log(err);
    });

});

router.get('/events', function(req, res) {

    eventController.getEvents().then((response) => {
        var resd = JSON.stringify(response);
        resd = JSON.parse(resd);
        console.log(resd);
        for (var i = 0; i < resd.length; i++) {
            console.log('x' + resd[i]);
            var startDate = resd[i].event_date_start.split("T");
            resd[i].event_date_start = startDate[0];
            var endDate = resd[i].event_date_end.split("T");
            resd[i].event_date_end = endDate[0];
        }
        res.json(resd);
    }).catch(function(err) {
        console.log(err);
    });

});

router.get('/specificeventitems/:id', function(req, res) {
    let id = req.param('id');
    eventController.getSpecificEvents(id).then((response) => {
        var resd = JSON.stringify(response);
        var resd1 = '';
        resd = JSON.parse(resd);
        console.log("11" + JSON.stringify(resd));
        itemController.getItems().then((response1) => {
            resd1 = JSON.stringify(response1);
            resd1 = JSON.parse(resd1);

            var finalRes = _.unionBy(resd, resd1, "items_code");
            console.log("11" + JSON.stringify(finalRes));
            for (var i = 0; i < finalRes.length; i++) {
                var startDate = finalRes[i].event_date_start ? finalRes[i].event_date_start.split("T") : [];
                finalRes[i].event_date_start = startDate.length > 0 ? startDate[0] : "";
                var endDate = finalRes[i].event_date_end ? finalRes[i].event_date_end.split("T") : [];
                finalRes[i].event_date_end = endDate.length > 0 ? endDate[0] : "";
                finalRes[i].color = !!finalRes[i].color ? finalRes[i].color.split(",") : [];
                if (finalRes[i].events_code) {
                    finalRes[i].checked = true
                    var stDate = finalRes[i].event_date_start.length > 0 ? finalRes[i].event_date_start.split("-") : [];
                    var enDate = finalRes[i].event_date_end.length > 0 ? finalRes[i].event_date_end.split("-") : [];
                    if (stDate.length > 0 && enDate.length > 0) {
                        finalRes[i].dates = { beginDate: { year: stDate[0], month: parseInt(stDate[1]), day: parseInt(stDate[2]) }, endDate: { year: enDate[0], month: parseInt(enDate[1]), day: parseInt(enDate[2]) } };
                        finalRes[i].eventDetails = { dates: [startDate[0], endDate[0]] }
                    }
                }
            }
            res.json(finalRes);
        }).catch(function(err) {
            console.log(err);
        });

    }).catch(function(err) {
        console.log(err);
    });

});

router.post('/updateEvent', function(req, res) {
    console.log("req", req.body)
    eventController
        .updateEvent(req.body)
        .then((response) => {
            console.log("gere1");
            eventController.deleteEventItems(req.body)
        })
        .then((response) => {
            eventController.addEventItems(req.body)
        })
        .then((response) => {
            res.send({ status: "202", response: JSON.stringify(response) });
        })
        .catch((e) => {
            res.send({ status: "501", response: "Error " + e });
        })

});

router.get('/monthlysales/:id', function(req, res) {
    let id = req.param('id');
    eventController.getMontlySales(id).then((response) => {
        res.json(response);
    });
});

router.get('/bookingitems', function(req, res) {
    let id = req.param('id');
    eventController.getBookingItems().then((response) => {
        res.json(response);
    });
});

router.get('/todayevents', function(req, res) {
    var date = moment().format('YYYY-DD-MM');
    console.log(date);
    eventController.getTodayEvents().then((response) => {
        res.json(response);
    });
});

router.get('/recentevents', function(req, res) {
    var date = moment().format('YYYY-DD-MM');
    dateEnd = moment().add(7, 'days').format('YYYY-DD-MM')
    eventController.getRecentEvents(dateEnd).then((response) => {
        res.json(response);
    });
});



router.get('/specificeventdetails/:id', function(req, res) {

    let id = req.param('id');
    eventController.getSpecificEventDetails(id).then((response) => {
        var resd = JSON.stringify(response);
        resd = JSON.parse(resd);
        resd = resd.length > 0 ? resd[0] : '';
        var startDate = resd.event_date_start ? resd.event_date_start.split("T") : [];
        resd.event_date_start = startDate.length > 0 ? startDate[0] : "";
        var endDate = resd.event_date_end ? resd.event_date_end.split("T") : [];
        resd.event_date_end = endDate.length > 0 ? endDate[0] : "";
        var stDate = resd.event_date_start.length > 0 ? resd.event_date_start.split("-") : [];
        var enDate = resd.event_date_end.length > 0 ? resd.event_date_end.split("-") : [];
        resd.dates = { beginDate: { year: stDate[0], month: parseInt(stDate[1]), day: parseInt(stDate[2]) }, endDate: { year: enDate[0], month: parseInt(enDate[1]), day: parseInt(enDate[2]) } };
        resd.eventDetails = { dates: [startDate[0], endDate[0]] }
        res.json(resd);
    }).catch(function(err) {
        console.log(err);
    });

});



router.get('/eventcodes', function(req, res) {

    eventController.getEventCodes().then((response) => {

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

router.post('/receiveAmount', function(req, res) {
    var obj = req.body;
    var eventCode = obj.eventCode;
    eventController
        .getSpecificEventDetails(eventCode)
        .then((response) => {
            console.log("res" + JSON.stringify(response))

            if (response.length > 0) {
                obj.netAmount = response[0].total_amount;
                obj.amountRecieved = parseFloat(response[0].recieved_amount) + parseFloat(obj.amount);
                obj.amountBalanced = parseFloat(response[0].total_amount) - obj.amountRecieved;
                eventController.updateAmount(obj)

            }
        })
        .then((response) => {
            res.send({ status: "202", response: JSON.stringify(response) });
        })
        .catch((e) => {
            res.send({ status: "501", response: "Error " + e });
        })

});

router.post('/updateItem', function(req, res) {
    itemController
        .updateItem(req.body)
        .then((response) => {
            res.send(JSON.stringify(response));
        }).then((response) => {
            res.send({ status: "202", response: JSON.stringify(response) });
        })
        .catch((e) => {
            res.send({ status: "501", response: "Error " + e });
        })
});

router.post('/addItem', function(req, res) {
    itemController
        .createItem(req.body)
        .then((response) => {
            res.send({ status: "202", response: JSON.stringify(response) });
        })
        .catch((e) => {
            res.send({ status: "501", response: "Error " + e });
        })
});

router.post('/addEvent', function(req, res) {
    console.log(req.body);
    eventController
        .createEvent(req.body)
        .then((response) => {
            return eventController.addEventDetails(req.body)
        })
        .then((response1) => {
            return eventController.addEventItems(req.body)
        })
        .then((response2) => {
            return customerController.addCustomer(req.body)
        })
        .then((response3) => {
            console.log("xx" + JSON.stringify(response3));
            return customerController.getSpecificCustomer(req.body)
        })
        .then((response4) => {
            console.log("xx1" + JSON.stringify(response4));
            return eventController.addCustomerEventRelation(req.body, response4)
        })
        .then((response) => {
            res.send({ status: "202", response: JSON.stringify(response) });
        })
        .catch((e) => {
            res.send({ status: "501", response: "Error " + e });
        })
});

router.post('/addCategory', function(req, res) {
    itemController
        .createCategory(req.body)
        .then((response) => {
            res.send({ status: "202", response: JSON.stringify(response) });
        })
        .catch((e) => {
            res.send({ status: "501", response: "Error " + e });
        })
});

router.get('/items', function(req, res) {

    itemController.getItems()
        .then((response) => {
            res.json(response);
        });

});

router.get('/itemquantity', function(req, res) {
    console.log(req.query);
    var startDate = req.query.hasOwnProperty("start_date") ? req.query.start_date : '';
    var endDate = req.query.hasOwnProperty("end_date") ? req.query.end_date : '';
    var finalResponse = '';
    if (startDate, endDate) {
        itemController.getSelectedItemQuantity(startDate, endDate).then((response) => {
            res.json(response);
        });
    } else {
        res.json("Invalid Request");
    }
});

router.get('/itemscategory', function(req, res) {

    itemController.getItemsCategories().then((response) => {
        res.json(response);
    });

});

module.exports = router;