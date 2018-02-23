var connection = require('../config/connection');
class ProjectModel {

    constructor() {

    }

    getProjects(filters) {
        return new Promise(function (resolve, reject) {
            connection.query("SELECT * FROM customers", function (err, results, fields) {
                console.log(results);
                if (!err) {
                    resolve(results);
                } else {
                    reject(err)
                }
            });

        });
    }
}


module.exports = new ProjectModel();