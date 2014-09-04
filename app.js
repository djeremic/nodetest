var express = require('express')
    , routes  = require('./routes')
    , users    = require('./routes/user')
    , restaurants    = require('./routes/restaurant')
    , places    = require('./routes/place')
    , tags    = require('./routes/tag')
    , descriptions    = require('./routes/desc')
    , http    = require('http')
    , path    = require('path')
    , db      = require('./models')

var exphbs  = require('express3-handlebars');
var path = require('path');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/user');

var fs = require("fs");
var file = "public/users.db";
var exists = fs.existsSync(file);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);


db.serialize(function() {
    if(!exists) {
        console.log('create database');
        db.run("CREATE TABLE Restaurants(id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(255) NOT NULL,address VARCHAR(255) NOT NULL, " +
            "phone VARCHAR(255) NOT NULL,website VARCHAR(255) NOT NULL, metro VARCHAR(255), opening_hours_en VARCHAR(255), opening_hours_fr VARCHAR(255), " +
            " booking INTEGER, price_level INTEGER, know_en TEXT,  know_fr TEXT,  eat_en TEXT,  eat_fr TEXT,  drink_en TEXT,  drink_fr TEXT,  tip_en TEXT,  tip_fr TEXT,  gossip_en TEXT,  gossip_fr TEXT," +
            "longitude number NOT NULL, latitude number NOT NULL, createdAt date, updatedAt date)");
        db.run("CREATE TABLE Users(id INTEGER PRIMARY KEY AUTOINCREMENT,first_name TEXT NOT NULL,last_name TEXT NOT NULL, password TEXT NOT NULL, token TEXT NOT NULL, createdAt date, updatedAt date,email TEXT NOT NULL)");
        db.run("INSERT INTO Users(first_name, last_name, email) VALUES('Drago', 'Jeremic', 'dragojeremic@gmail.com');");
        db.run("CREATE TABLE Tags(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL, createdAt date, updatedAt date)");
        db.run("CREATE TABLE RestaurantsTags(RestaurantId INTEGER, TagId INTEGER, createdAt date, updatedAt date)");
        db.run("CREATE TABLE RestaurantsUsers(RestaurantId INTEGER, UserId INTEGER, createdAt date, updatedAt date)");
        db.run("CREATE TABLE Places(id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL, " +
            "phone VARCHAR(255), website VARCHAR(255), " +
            "longitude number NOT NULL, latitude number NOT NULL, createdAt date, updatedAt date)");
        db.run("CREATE TABLE Descriptions(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, desc_en TEXT, desc_fr TEXT, createdAt date, updatedAt date)");
        db.close();
    }
});

app.use(favicon());
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

app.get('/', routes.index)
app.post('/users/register', users.create)
app.get('/users/register', users.register)
app.post('/users/login', users.loginPost)
app.post('/api/users/login', users.loginPost)
app.get('/users/login', users.login)
app.get('/users/logout', users.logout)
app.get('/restaurants', restaurants.index);
app.get('/my-restaurants', restaurants.usersRestaurants);
app.get('/restaurants/add', restaurants.add);
app.post('/restaurants/add', restaurants.addPost);
app.post('/restaurants/favourites/add', restaurants.addToFavourite);
app.delete('/restaurants/favourites/remove', restaurants.removeFromFavourite);
app.get('/tags', tags.index);
app.post('/tags/add', tags.add);
app.post('/tags/find', tags.find);
app.get('/places', places.index);
app.get('/places/add', places.add);
app.post('/places/add', places.addPost);
app.post('/places/find', places.find);
app.post('/descriptions/add', descriptions.addPost);
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
