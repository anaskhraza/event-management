var express = require('express');
var app = express();
var config = require('./config/config');
var path = require('path');
var mysql = require('mysql');
var appRouter = require('./routes/app-routes');
var apiRouter = require('./routes/api-routes');
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use('/', appRouter);
app.use('/api', apiRouter);
app.listen(config.generalConfig.port, function(err) {
    if (err) {
        console.log("server error", err);
        return;
    }
    console.log("server connected", config.generalConfig.port);
});