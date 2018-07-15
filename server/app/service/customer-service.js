var connection = require('../config/connection');

class CustomerService {

    constructor() {

    }

    getCustomers(filters) {
        return new Promise(function(resolve, reject) {
            let query = "select * from Items_Name";
            connection.query(query, function(err, results, fields) {

                if (!err) {
                    resolve(results);
                } else {
                    reject(err)
                }
            });

        });
    }

    getTotalCustomer() {
        return new Promise(function(resolve, reject) {
            let query = "Select COUNT(number) AS count from customer";
            console.log("query2  " + query);
            connection.query(query, function(err, results, fields) {

                if (!err) {
                    resolve(results);
                } else {
                    reject(err)
                }
            });

        });
    }

    addCustomer(customerObject) {
        return new Promise(function(resolve, reject) {
            var personal = customerObject.personal;
            let query = 'INSERT INTO customer (name, email, number)' +
                'SELECT * FROM (SELECT "' + personal.name + '", "' + personal.email + '", "' + personal.number + '") AS tmp' +
                ' WHERE NOT EXISTS (' +
                'SELECT number FROM customer WHERE number = "' + personal.number + '"' +
                ') LIMIT 1';
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

    getSpecificCustomer(customerObject) {
        return new Promise((resolve, reject) => {
            var personal = customerObject.personal;
            let query = 'SELECT * FROM customer where number="' + personal.number + '"';
            console.log("query3  " + query);
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


module.exports = new CustomerService();