var express = require('express'),
    app = express(),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    config = require('./config/config.js'),
    ConnectMongo = require('connect-mongo')(session),
    mongoose = require('mongoose').connect(config.dbURL),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({secret: 'catscanfly', saveUninitialized:true, resave: true}));

var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    app.use(session({
        secret: config.sessionSecret,
        resave: true,
        saveUninitialized: true
    }));
} else {
    app.use(session({
        secret: config.sessionSecret,
        resave: true,
        saveUninitialized: true,
        store: new ConnectMongo({
            mongoose_connection: mongoose.connections[0],
            stringify: true
        })
    }));
}

app.use(passport.initialize());
app.use(passport.session());

require('./auth/passportAuth.js')(passport, FacebookStrategy, config, mongoose);

console.log('Mode: ' + env);

module.exports = app;
