var connection = require('../config/connection');

class EventService {

    constructor() {

    }

    getEvents(filters) {
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

    addEvent(eventObject) {
        return new Promise(function(resolve, reject) {
            eventObject
            // let query = "select * from Items";
            // connection.query(query, function(err, results, fields) {
            //     console.log(eventObject);
            //     if (!err) {
            //         resolve(results);
            //     } else {
            //         reject(err)
            //     }
            // });

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


module.exports = new EventService();