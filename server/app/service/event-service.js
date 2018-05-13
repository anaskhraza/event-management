var connection = require('../config/connection');

class EventService {

    constructor() {

    }

    updateAmount(eventObject) {
        return new Promise(function(resolve, reject) {
            var totalAmount = parseFloat(eventObject.netAmount);
            var recievedAmount = parseFloat(eventObject.amountRecieved)
            var recieved = 0;
            if (totalAmount == recievedAmount) {
                recieved = 1;
            }
            let query = 'Update cost_booking Set amount_balance ="' + eventObject.amountBalanced + '", recieved ="' + recieved + '", recieved_amount ="' + eventObject.amountRecieved + '" where events_code = "' + eventObject.eventCode + '"';


            connection.query(query, function(err, results, fields) {
                if (!err) {
                    resolve(results);
                } else {
                    reject(err)
                }
            });

        });
    }

    addEvent(eventObject) {
        return new Promise(function(resolve, reject) {
            console.log(JSON.stringify(eventObject));
            let eventCost = eventObject.finance;
            var totalAmount = parseFloat(eventCost.netAmount);
            var recievedAmount = parseFloat(eventCost.amountPaid);
            var recieved = 0;
            if (totalAmount == recievedAmount) {
                recieved = 1;
            }
            let query = 'INSERT INTO `cost_booking` (`events_code`,`gross_amount`, `discount_amount`, `total_amount`,  `amount_balance`, `recieved_amount`, `recieved`, `perHeadCost`, `noOfGuests`)' +
                'VALUES ( "' + eventObject.eventCode + '", "' + eventCost.grossAmount + '", "' + eventCost.discount + '", "' + eventCost.netAmount + '", "' + eventCost.amountRemaining + '", "' + eventCost.amountPaid + '", "' + recieved + '", "' + eventObject.eventDetails.perHead + '", "' + eventObject.eventDetails.noOfGuests + '")';
            connection.query(query, function(err, results, fields) {
                if (!err) {
                    resolve(results);
                } else {
                    reject(err)
                }
            });
        });
    }



    updateEvent(eventObject) {
        return new Promise(function(resolve, reject) {
            var totalAmount = parseFloat(eventObject.netAmount);
            var recievedAmount = parseFloat(eventObject.amountRecieved)

            var recieved = 0;
            if (totalAmount == recievedAmount) {
                recieved = 1;
            }
            let query = 'Update cost_booking Set amount_balance ="' + eventObject.remaining + '", recieved_amount ="' + eventObject.advance + '", total_amount ="' + eventObject.netAmount + '", recieved ="' + recieved + '", gross_amount ="' + eventObject.totalCost + '", perHeadCost ="' + eventObject.perHead + '", noOfGuests ="' + eventObject.noOfGuests + '", discount_amount ="' + eventObject.discount + '" where events_code = "' + eventObject.events_code + '"';

            connection.query(query, function(err, results, fields) {
                if (!err) {
                    resolve(results);
                } else {
                    reject(err)
                }
            });

        });
    }
    deleteCompleteEvent(eventCode) {

        return new Promise(function(resolve, reject) {

            let query = 'Delete a.*, b.*, c.* from customer_booking c Left Join event_booking b ON b.events_code = c.events_code Left Join cost_booking a ON a.events_code = c.events_code  where c.events_code ="' + eventCode + '"';
            console.log(" query   --------   " + query);

            connection.query(query, function(err, results, fields) {
                if (!err) {
                    resolve(results);
                } else {
                    reject(err)
                }
            });

        });
    }

    deleteEventItems(eventCode, itemCode) {
        if (eventCode) {
            return new Promise(function(resolve, reject) {

                let query = 'Delete From booking_items where events_code =' + eventCode;


                connection.query(query, function(err, results, fields) {
                    if (!err) {
                        resolve(results);
                    } else {
                        reject(err)
                    }
                });

            });
        } else {
            return new Promise(function(resolve, reject) {

                let query = 'Delete From booking_items where items_code ="' + itemCode + '"';
                console.log(query);
                connection.query(query, function(err, results, fields) {
                    if (!err) {
                        resolve(results);
                    } else {
                        reject(err)
                    }
                });

            });
        }
    }

    getSpecificEvents(eventCode) {
        return new Promise(function(resolve, reject) {
            let query = 'SELECT * FROM `booking_items` Left JOIN `items` ON items.items_code = booking_items.items_code  Where booking_items.events_code =' + eventCode;
            connection.query(query, function(err, results, fields) {
                if (!err) {
                    resolve(results);
                } else {
                    reject(err)
                }
            });

        });
    }

    getMontlySales(month) {
        return new Promise(function(resolve, reject) {
            let query = 'SELECT DATE_FORMAT(`booking_date`,"%M") AS label, COUNT(`booking_date`) AS value FROM event_booking where YEAR(booking_date) = "' + month + '" GROUP BY label';
            connection.query(query, function(err, results, fields) {
                if (!err) {
                    resolve(results);
                } else {
                    reject(err)
                }
            });

        });
    }

    getTotalEvents() {
        return new Promise(function(resolve, reject) {
            let query = 'Select COUNT(events_code) AS count from cost_booking';
            connection.query(query, function(err, results, fields) {
                if (!err) {
                    resolve(results);
                } else {
                    reject(err)
                }
            });

        });
    }

    getMontlyTargetSales(month) {
        return new Promise(function(resolve, reject) {
            let query = 'SELECT DATE_FORMAT(`date_created`,"%M") AS month, SUM(`total_amount`) AS amount FROM cost_booking where YEAR(date_created)= "' + month + '"  GROUP BY month';
            connection.query(query, function(err, results, fields) {
                if (!err) {
                    resolve(results);
                } else {
                    reject(err)
                }
            });

        });
    }

    getMonthlyTargets(year) {
        return new Promise(function(resolve, reject) {
            let query = 'Select Target, Month from projected_revenue where Year = "' + year + '"';
            connection.query(query, function(err, results, fields) {
                if (!err) {
                    resolve(results);
                } else {
                    reject(err)
                }
            });

        });
    }

    getTodayEvents() {
        return new Promise(function(resolve, reject) {
            let query = 'SELECT event_booking.events_code , event_booking.event_name, DATE_FORMAT(event_booking.event_date_start, "%d-%m-%y") AS event_date_start, cost_booking.total_amount, cost_booking.recieved_amount,cost_booking.amount_balance FROM `event_booking` ' +
                'INNER JOIN `cost_booking` On event_booking.events_code = cost_booking.events_code ' +
                'WHERE event_booking.event_date_start  = CURDATE() LIMIT 3';
            connection.query(query, function(err, results, fields) {
                if (!err) {
                    resolve(results);
                } else {
                    reject(err)
                }
            });

        });
    }

    getRecentEvents(dateEnd) {
        return new Promise(function(resolve, reject) {

            let query = 'SELECT event_booking.events_code , event_booking.event_name, DATE_FORMAT(event_booking.event_date_start, "%d-%m-%y") AS event_date_start, cost_booking.total_amount, cost_booking.recieved_amount, cost_booking.amount_balance FROM `event_booking` ' +
                'INNER JOIN `cost_booking` On event_booking.events_code = cost_booking.events_code ' +
                'WHERE event_booking.event_date_start  > CURDATE() AND event_booking.event_date_end <"' + dateEnd + '"  LIMIT 3';
            connection.query(query, function(err, results, fields) {
                if (!err) {
                    resolve(results);
                } else {
                    reject(err)
                }
            });

        });
    }

    getBookingItems() {
        return new Promise(function(resolve, reject) {
            let query = 'SELECT * from booking_items Limit 8';
            connection.query(query, function(err, results, fields) {
                if (!err) {
                    resolve(results);
                } else {
                    reject(err)
                }
            });

        });
    }

    addCustomerEventRelation(eventObject, response) {
        return new Promise(function(resolve, reject) {
            if (response.length > 0) {
                var id = response[0].id;
                let query = 'INSERT INTO customer_booking (events_code, customer_id)' +
                    'SELECT * FROM (SELECT "' + eventObject.eventCode + '", "' + id + '") AS tmp' +
                    ' WHERE NOT EXISTS (' +
                    'SELECT customer_id FROM customer_booking WHERE events_code = "' + eventObject.eventCode + '"' +
                    ') LIMIT 1';
                connection.query(query, function(err, results, fields) {
                    if (!err) {
                        resolve(results);
                    } else {
                        reject(err)
                    }
                });
            } else {
                reject(err)
            }
        });
    }

    getSpecificEventDetails(eventCode) {
        return new Promise(function(resolve, reject) {
            let query = 'SELECT cost_booking.events_code, cost_booking.gross_amount, cost_booking.discount_amount, cost_booking.total_amount, cost_booking.amount_balance, cost_booking.recieved_amount, event_booking.event_name, event_booking.event_date_start, event_booking.event_date_end, event_booking.location, cost_booking.perHeadCost, cost_booking.noOfGuests, event_booking.booking_date, customer.name, customer.number from cost_booking Left JOIN `event_booking` ON cost_booking.events_code = event_booking.events_code Left Join customer_booking ON  cost_booking.events_code = customer_booking.events_code Left Join customer ON  customer_booking.customer_id = customer.id Where event_booking.events_code =' + eventCode;
            connection.query(query, function(err, results, fields) {
                if (!err) {
                    resolve(results);
                } else {
                    reject(err)
                }
            });

        });
    }

    getEvents() {
        return new Promise(function(resolve, reject) {
            let query = 'SELECT event_booking.events_code, event_booking.event_date_start, event_booking.event_date_end, cost_booking.gross_amount, cost_booking.discount_amount, cost_booking.total_amount, cost_booking.amount_balance, cost_booking.recieved_amount FROM `event_booking` LEFT JOIN  `cost_booking` ON event_booking.events_code = cost_booking.events_code INNER JOIN `customer_booking` ON event_booking.events_code = customer_booking.events_code INNER JOIN `customer` ON customer_booking.customer_id = customer.id ORDER BY event_booking.event_date_start';

            connection.query(query, function(err, results, fields) {
                if (!err) {

                    resolve(results);

                } else {
                    reject(err)
                }
            });

        });
    }

    getAmountDueEvents() {
        return new Promise(function(resolve, reject) {
            let query = 'SELECT event_booking.events_code, event_booking.event_date_start, event_booking.event_date_end, cost_booking.gross_amount, cost_booking.discount_amount, cost_booking.total_amount, cost_booking.amount_balance, cost_booking.recieved_amount FROM `event_booking` LEFT JOIN  `cost_booking` ON event_booking.events_code = cost_booking.events_code INNER JOIN `customer_booking` ON event_booking.events_code = customer_booking.events_code INNER JOIN `customer` ON customer_booking.customer_id = customer.id Where cost_booking.`amount_balance` > 0 ORDER BY event_booking.event_date_start';

            connection.query(query, function(err, results, fields) {
                if (!err) {

                    resolve(results);

                } else {
                    reject(err)
                }
            });

        });
    }

    getEventCodes() {
        return new Promise(function(resolve, reject) {
            let query = 'SELECT `events_code` FROM `cost_booking` ORDER BY `events_code` DESC LIMIT 1';
            connection.query(query, function(err, results, fields) {

                if (!err) {
                    resolve(results);
                } else {
                    reject(err)
                }
            });

        });
    }

    addEventDetails(eventObject) {
        return new Promise(function(resolve, reject) {
            let eventDetails = eventObject.eventDetails;
            let query = 'INSERT INTO `event_booking` (`events_code`, `event_name`, `event_date_start`, `event_date_end`,  `location`)' +
                'VALUES ( "' + eventObject.eventCode + '", "' + eventDetails.title + '", "' + eventDetails.dates[0].trim() + '", "' + eventDetails.dates[1].trim() + '", "' + eventDetails.location + '")';

            connection.query(query, function(err, results, fields) {
                if (!err) {
                    resolve(results);
                } else {
                    reject(err)
                }
            });

        });
    }

    // addEventItems(eventObject) {
    //     let eventItems = eventObject.items;
    //     for (var i = 0; i < eventItems.length; i++) {
    //         this.addEventItem(eventItems[i]);
    //     }
    // }

    addEventItems(eventObject) {
        return new Promise(function(resolve, reject) {

            let query = 'INSERT INTO `booking_items` (`items_code`, `quantity_booked`, `event_date_start`,  `event_date_end`, `events_code`)' +
                'VALUES' + eventObject.sql


            connection.query(query, function(err, results, fields) {

                if (!err) {

                    resolve(results);
                } else {
                    reject(err)
                }
            });

        });
    }

    getItemCategories(filters) {
        return new Promise(function(resolve, reject) {
            let query = "select * from items_category";
            connection.query(query, function(err, results, fields) {

                if (!err) {
                    resolve(results);
                } else {
                    reject(err)
                }
            });

        });
    }

    getItemById(id) {
        return new Promise((resolve, reject) => {
            if (!!id) {
                let query = `SELECT * FROM customers where id=${id}`;
                connection.query(query, function(err, results, fields) {

                    if (!err) {
                        resolve(results);
                    } else {
                        reject(err)
                    }
                });
            } else {
                reject("error")
            }

        });
    }
}


module.exports = new EventService();