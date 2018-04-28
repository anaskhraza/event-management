var connection = require('../config/connection');

class ItemService {

    constructor() {

    }

    getItems(filters) {
        return new Promise(function(resolve, reject) {
            let query = "select * from Items";
            connection.query(query, function(err, results, fields) {
                console.log(results);
                if (!err) {
                    resolve(results);
                } else {
                    reject(err)
                }
            });

        });
    }

    getSelectedItemQuantity(dateFrom, dateTo) {
        console.log("iq" + dateTo);
        return new Promise(function(resolve, reject) {
            let query = 'SELECT itms.name, itms.items_code, itms.quantity, itms.price, itms.color, itms.category, (SELECT itms.quantity-SUM(booking_items.quantity_booked) AS "qty" from booking_items ' +
                'INNER JOIN event_booking ON booking_items.events_code = event_booking.events_code ' +
                'where event_booking.event_date_start >= "' + dateFrom + '" AND event_booking.event_date_end <= "' + dateTo + '" AND booking_items.items_code = itms.items_code) AS itemquantity FROM items AS itms';
            console.log("iq: " + query);

            connection.query(query, function(err, results, fields) {
                console.log("2" + JSON.stringify(results));
                if (!err) {
                    if (results.length > 0) {
                        for (var i = 0; i < results.length; i++) {
                            results[i].quantity = !!results[i].itemquantity ? results[i].itemquantity : results[i].quantity;
                        }
                    }
                    resolve(results);
                } else {
                    reject(err)
                }
            });
        });
    }

    addItem(itemObject) {
        return new Promise(function(resolve, reject) {
            let query = 'INSERT INTO items (items_code, name, quantity, price, color, category)' +
                'SELECT * FROM (SELECT "' + itemObject.sku + '", "' + itemObject.name + '", "' + itemObject.quantity + '", "' + itemObject.rate + '", "' + itemObject.colors + '", "' + itemObject.selectedCategory + '") AS tmp' +
                ' WHERE NOT EXISTS (' +
                'SELECT items_code FROM items WHERE items_code = "' + itemObject.sku + '"' +
                ') LIMIT 1';
            connection.query(query, function(err, results, fields) {
                if (!err) {
                    resolve(results);
                } else {
                    reject(err)
                }
            });
        });
    }

    updateItem(itemObject) {
        return new Promise(function(resolve, reject) {
            let query = 'UPDATE items SET name ="' + itemObject.name + '", price ="' + itemObject.price + '", color ="' + itemObject.colors + '", category ="' + itemObject.category + '", quantity ="' + itemObject.quantity + '" WHERE items_code = "' + itemObject.sku + '"';

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

    getItemCategories(filters) {
        return new Promise(function(resolve, reject) {
            let query = "select * from items_category";
            connection.query(query, function(err, results, fields) {
                console.log(results);
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
                    console.log(results);
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


module.exports = new ItemService();