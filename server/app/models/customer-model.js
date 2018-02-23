var connection = require('../config/connection');

class CustomerModel {

    constructor() {

    }

    getCustomers(filters) {
        return new Promise(function(resolve, reject) {
            let query = "select * from Items_Name";
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

    getCustomerById(id) {
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


module.exports = new CustomerModel();