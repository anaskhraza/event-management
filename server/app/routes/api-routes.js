let express = require("express");
var app = express();
let router = express.Router();
let customerController = require('../controllers/customer-controller');
let itemController = require('../controllers/item-controller');
let eventController = require('../controllers/event-controller');
let bodyParser = require('body-parser');
var pdf = require('html-pdf');
var _ = require('lodash');
var moment = require('moment');
var fs = require('fs');

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

    });

});


router.get('/events', function(req, res) {

    eventController.getEvents().then((response) => {


        var resd = JSON.stringify(response);
        resd = JSON.parse(resd);

        for (var i = 0; i < resd.length; i++) {

            var startDate = resd[i].event_date_start.split("T");

            resd[i].event_date_start = moment(startDate[0]).add(1, 'days').format('YYYY-MM-DD');
            var endDate = resd[i].event_date_end.split("T");

            resd[i].event_date_end = moment(endDate[0]).add(1, 'days').format('YYYY-MM-DD');;
        }
        res.json(resd);
    }).catch(function(err) {
        console.log(err);
    });

});

router.get('/amountdueevents', function(req, res) {

    eventController.getAmountDueEvents().then((response) => {


        var resd = JSON.stringify(response);
        resd = JSON.parse(resd);

        for (var i = 0; i < resd.length; i++) {

            var startDate = resd[i].event_date_start.split("T");

            resd[i].event_date_start = moment(startDate[0]).add(1, 'days').format('YYYY-MM-DD');
            var endDate = resd[i].event_date_end.split("T");

            resd[i].event_date_end = moment(endDate[0]).add(1, 'days').format('YYYY-MM-DD');;
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

        itemController.getItems().then((response1) => {
            resd1 = JSON.stringify(response1);
            resd1 = JSON.parse(resd1);

            var finalRes = _.unionBy(resd, resd1, "items_code");

            for (var i = 0; i < finalRes.length; i++) {
                var startDate = finalRes[i].event_date_start ? finalRes[i].event_date_start.split("T") : [];
                finalRes[i].event_date_start = startDate.length > 0 ? moment(startDate[0]).add(1, 'days').format('YYYY-MM-DD') : "";
                var endDate = finalRes[i].event_date_end ? finalRes[i].event_date_end.split("T") : [];
                finalRes[i].event_date_end = endDate.length > 0 ? moment(endDate[0]).add(1, 'days').format('YYYY-MM-DD') : "";
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

router.post('/deleteEvent', function(req, res) {
    var obj = req.body;
    var eventCode = obj.eventCode;
    eventController
        .deleteEventItems({ events_code: eventCode })
        .then((response) => {
            eventController.deleteCompleteEvent({ events_code: eventCode })
        })
        .then((response) => {
            res.send({ status: "202", response: eventCode.toString() });
        })
        .catch((e) => {
            res.send({ status: "501", response: "Error " + e });
        })
});

router.post('/deleteItem', function(req, res) {
    var obj = req.body;
    var itemCode = obj.itemCode;
    eventController
        .deleteEventItems({ items_code: itemCode })
        .then((response) => {
            itemController.deleteItem({ items_code: itemCode })
        })
        .then((response) => {
            res.send({ status: "202", response: itemCode.toString() });
        })
        .catch((e) => {
            res.send({ status: "501", response: "Error " + e });
        })
});


router.post('/updateEvent', function(req, res) {

    var obj = req.body;
    var eventCode = obj.events_code;
    eventController
        .updateEvent(req.body)
        .then((response) => {

            eventController.deleteEventItems(req.body)
        })
        .then((response) => {
            eventController.addEventItems(req.body)
        })
        .then((response) => {
            res.send({ status: "202", response: eventCode.toString() });
        })
        .catch((e) => {
            res.send({ status: "501", response: "Error " + e });
        })

});

router.get('/monthlytargets/:id', function(req, res) {
    let id = req.param('id');
    eventController.getMonthlyTargets(id).then((response) => {
        res.json(response);
    });
});

router.get('/monthlysales/:id', function(req, res) {
    console.log("gere");
    let id = req.param('id');
    eventController.getMontlySales(id).then((response) => {
        res.json(response);
    });
});



router.get('/monthlysalestarget/:id', function(req, res) {
    let id = req.param('id');
    var resp = '';
    var resp1 = '';
    eventController.getMontlySalesTarget(id)
        .then((response) => {
            resp = response;

            eventController.getMonthlyTargets(id)
                .then((response1) => {
                    resp1 = response1;
                    res.send({ status: "202", response: { monthlySalesTarget: JSON.stringify(resp), monthlyTarget: JSON.stringify(resp1) } });
                })
        })
        .catch((e) => {
            res.send({ status: "501", response: "Error " + e });
        })
});

router.get('/targets', function(req, res) {

    eventController.getTargets().then((response) => {
        res.json(response);
    });
});

router.post('/deletetarget', function(req, res) {
    eventController
        .deleteTarget(req.body)
        .then((response) => {
            res.send({ status: "202", response: JSON.stringify(response) });
        })
        .catch((e) => {
            res.send({ status: "501", response: "Error " + e });
        })
});


router.post('/createtarget', function(req, res) {
    eventController
        .createTarget(req.body)
        .then((response) => {
            res.send({ status: "202", response: JSON.stringify(response) });
        })
        .catch((e) => {
            res.send({ status: "501", response: "Error " + e });
        })
});


router.get('/bookingitems', function(req, res) {
    let id = req.param('id');
    eventController.getBookingItems().then((response) => {
        res.json(response);
    });
});

router.get('/todayevents', function(req, res) {
    var date = moment().format('YYYY-MM-DD');

    eventController.getTodayEvents().then((response) => {
        res.json(response);
    });
});

router.get('/totalevents', function(req, res) {

    eventController.getTotalEvents().then((response) => {
        res.json(response);
    });
});

router.get('/totalcustomers', function(req, res) {

    customerController.getTotalCustomer().then((response) => {
        res.json(response);
    });
});

router.get('/totalitems', function(req, res) {

    itemController.getTotalItems().then((response) => {
        res.json(response);
    });
});

router.get('/recentevents', function(req, res) {
    var date = moment().format('YYYY-MM-DD');
    dateEnd = moment().add(7, 'days').format('YYYY-MM-DD')
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
        resd.event_date_start = startDate.length > 0 ? moment(startDate[0]).add(1, 'days').format('YYYY-MM-DD') : "";
        var endDate = resd.event_date_end ? resd.event_date_end.split("T") : [];
        resd.event_date_end = endDate.length > 0 ? moment(endDate[0]).add(1, 'days').format('YYYY-MM-DD') : "";
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

            return customerController.getSpecificCustomer(req.body)
        })
        .then((response4) => {

            return eventController.addCustomerEventRelation(req.body, response4)
        })
        .then((response) => {
            res.send({ status: "202", response: JSON.stringify(req.body.eventCode) });
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

router.post('/savefile', function(req, res) {
    var reqObj = req.body;
    var htmlBody = reqObj.htmlBody;
    var eventCode = reqObj.eventCode;

    // fs.write(__dirname + '/' + eventCode + '.html', htmlBody, function(err) {
    //     if (err) throw err;
    //     console.log('Saved!');
    // });
    var options = { format: 'Letter' };

    pdf.create(unescape(htmlBody), options).toFile('../../../invoices/' + eventCode + '.pdf', function(err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
    });
    res.send({ status: "202", reposne: "Suucess" });
});


router.get('/invoicehtml', function(req, res) {

    fs.readFile(__dirname + '/print.html', 'utf-8', function read(err, data) {
        if (err) {
            throw err;
        }
        res.send({ status: "202", data: data });
    });
});

function processFile() {

}
router.get('/itemquantity', function(req, res) {

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