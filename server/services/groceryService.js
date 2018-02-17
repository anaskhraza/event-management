const express = require('express')
const mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 100, //important
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'grocery',
    debug: false
});
class GroceryService {
    constructor(req, res) {
        this.req = req
        this.res = res;
    }

    addGrocery() {

    }
    getGrocery() {
        // let promise = new promise((res, rej) => {
        //         pool.getConnection((err, connection) => {
        //             if (err) {
        //                 rej(this.res.json({ "code": 100, "status": "Error in connection database" }));
        //                 return;
        //             }
        //         });
        //         console.log('connected as id ' + connection.threadId);
        //         res(connection.threadId);
        //     })
        //     .then((onres) => {
        //         connection.query("select * from Items_Name", (err, rows) => {
        //             connection.release();
        //             if (!err) {
        //                 console.log(this.req);
        //                 this.res.json(rows);
        //             }
        //         })
        //     })
        //     .catch((error) => {
        //         if (connection && connection.end) connection.end();
        //         //logs out the error
        //         console.log(error);
        //     });

        pool.getConnection((err, connection) => {
            if (err) {
                this.res.json({ "code": 100, "status": "Error in connection database" });
                return;
            }

            console.log('connected as id ' + connection.threadId);

            connection.query("select * from Items_Name", (err, rows) => {
                connection.release();
                if (!err) {
                    this.res.json(rows);
                }
            });

            connection.on('error', (err) => {
                this.res.json({ "code": 100, "status": "Error in connection database" });
                return;
            });
        });
    }
}
module.exports = GroceryService