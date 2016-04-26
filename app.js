'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var mongoose = require('mongoose');


var app = express();

require('./app/config/passport')(passport);

app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static('public'));

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

/**
 * Passport configurations
 */
app.use(session({
                    secret: 'fccbooktradingclubsecret',
                    resave: false,
                    saveUninitialized: true
                }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes/index')(app,passport);

module.exports = app;

