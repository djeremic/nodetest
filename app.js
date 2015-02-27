var express = require('express')
    , http    = require('http')
    , path    = require('path')
    , db      = require('./models')
    , users = require('./routes/user')

var exphbs  = require('express3-handlebars');
var path = require('path');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var multer  = require('multer');

var fs = require("fs");
var file = "public/pariseats.db";
var exists = fs.existsSync(file);

var app = express(),
    hbs;

app.use(multer({ dest: './public/uploads/'}));
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    helpers: require("./public/javascripts/helpers.js").helpers,
    partialsDir: "views/partials/"
}));
app.set('view engine', 'handlebars');

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);


db.serialize(function() {
    if(!exists) {
        db.run("CREATE TABLE Restaurants(id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(255) NOT NULL,address VARCHAR(255), " +
            "phone VARCHAR(255),website VARCHAR(255), metro VARCHAR(255), opening_hours_frames TEXT, opening_hours_en TEXT, opening_hours_fr TEXT, " +
            "kind_of_food_en VARCHAR(255), kind_of_food_fr VARCHAR(255), feeling_en VARCHAR(255), feeling_fr VARCHAR(255)," +
            "dress_code_en VARCHAR(255), dress_code_fr VARCHAR(255), go_for VARCHAR(255), deleted INTEGER DEFAULT 0, closed INTEGER DEFAULT 0," +
            " booking_en VARCHAR(255), price_level INTEGER, title_en VARCHAR(255) NOT NULL," +
            "longitude number NOT NULL, latitude number NOT NULL, createdAt date, updatedAt date)");
        db.run("CREATE TABLE Users(id INTEGER PRIMARY KEY AUTOINCREMENT,first_name TEXT NOT NULL,last_name TEXT NOT NULL, password TEXT NOT NULL, token TEXT NOT NULL, role TEXT,createdAt date, updatedAt date,email TEXT NOT NULL)");
        db.run("CREATE TABLE Tags(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL, createdAt date, updatedAt date)");
        db.run("CREATE TABLE RestaurantsTags(RestaurantId INTEGER, TagId INTEGER, createdAt date, updatedAt date)");
        db.run("CREATE TABLE RestaurantsUsers(RestaurantId INTEGER, UserId INTEGER, createdAt date, updatedAt date)");
        db.run("CREATE TABLE Places(id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL, " +
            "phone VARCHAR(255), type VARCHAR(255), website VARCHAR(255), " +
            "longitude number NOT NULL, latitude number NOT NULL, createdAt date, updatedAt date)");
        db.run("CREATE TABLE Descriptions(id INTEGER PRIMARY KEY AUTOINCREMENT, RestaurantId INTEGER, title TEXT NOT NULL, desc_en TEXT, desc_fr TEXT, createdAt date, updatedAt date)");
        db.run("CREATE TABLE Rates(id INTEGER PRIMARY KEY AUTOINCREMENT, RestaurantId INTEGER, UserId INTEGER, food INTEGER, service INTEGER, fun INTEGER, createdAt date, updatedAt date)");
        db.run("CREATE TABLE Versions(id INTEGER PRIMARY KEY AUTOINCREMENT, UserId INTEGER, description TEXT, createdAt date, updatedAt date)");
        db.run("CREATE TABLE Photos(id INTEGER PRIMARY KEY AUTOINCREMENT, RestaurantId INTEGER, name TEXT, path TEXT, originalname TEXT, createdAt date, updatedAt date)");
        db.close();
    }
});

app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
try {
    app.use(expressSession({secret: 'sdfjkht45489rfsjfkdjh', maxAge: 3600000}));
}catch(err){}

app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});

var passport = require('passport')
    ,FacebookStrategy = require('passport-facebook').Strategy;

app.use(passport.initialize());
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});
passport.use(new FacebookStrategy({
        //clientID: 1506984952881668,
        //clientSecret: '51d5a888fbcffc436288d3f33b09529c',
        clientID: 1576516315928531,
        clientSecret: '59d8be3dba33f5a57cf251d3f77959f5',
        callbackURL: "http://a2ss13.a2hosting.com:49555/auth/facebook/callback",
        passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done) {
        users.facebookLogin(accessToken, refreshToken, profile, done, req);
    }
));

//router
require('./routes/router')(app);
app.get('/auth/facebook', passport.authenticate('facebook', { display: 'popup', scope: [ 'email'], failureRedirect: '/' }));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/users/fbSuccess',
        failureRedirect: '/users/login' }));
/// catch 404 and forward to error handler

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
