/*
 * Copyright (c) 2016 James Tanner
 */

// REQUIRES --------------------------------------------------------------------
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

// INITIALIZE ------------------------------------------------------------------
var app = express();
var env = app.get('env');

// VIEW ENGINE -----------------------------------------------------------------
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// MIDDLEWARE ------------------------------------------------------------------
// TODO Put a favicon in public.
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true,
    sourceMap: true
}));

// ROUTING ---------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// ERROR HANDLING --------------------------------------------------------------
// In development, register an error handler that prints stack traces.
if (env === 'development') {
    app.use(function (err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message, error: err
        });
    });
}

// Otherwise, register an error handler that does not.
else {
    app.use(function (err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message, error: {}
        });
    });
}

// START SERVER ----------------------------------------------------------------
// Default port is 3000.
var port = 3000;
// Unless we're in production, in which case use port 80.
if (app.get(env) == 'production') port = 80;
// If there is a specified port, use that instead.
if (process.env.port) port = process.env.port;

// Listen on the selected port and that we've started.
app.listen(port);
console.log('Listening on port ' + port + ' (' + app.get('env') + ')');

// EXPORT ----------------------------------------------------------------------
module.exports = app;
