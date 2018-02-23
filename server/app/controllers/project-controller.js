
var BaseController = require('./base-controller');
var ProjectController = require('../models/project-model');

class CustomerController extends BaseController {
    constructor() {
        super();

    }

    getProjects(cb) {
        var projectsPromise = ProjectController.getProjects(null);
        return projectsPromise;
    }
}

module.exports = new CustomerController();