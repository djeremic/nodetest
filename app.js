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
var file = "public/pariseats.db";
var exists = fs.existsSync(file);

var app = express(),
    hbs;

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
        clientID: 1506984952881668,
        clientSecret: '51d5a888fbcffc436288d3f33b09529c',
        callbackURL: "http://a2ss13.a2hosting.com:49555/auth/facebook/callback",
        passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done) {
        users.facebookLogin(accessToken, refreshToken, profile, done, req);
    }
));

app.get('/', routes.index)
app.get('/best-of', routes.bestOf)
app.get('/best-of-frites', routes.bestOfFrites)
app.get('/best-of-chinese', routes.bestOfChinese)
app.get('/best-of-croissants', routes.bestOfCroissants)
app.get('/best-of-breads', routes.bestOfBreads)
app.get('/coup-de-coeur-abri', routes.coupDeCoeurAbri)
app.get('/coup-de-coeur-aki', routes.coupDeCoeurAki)
app.get('/coup-de-coeur-amorino', routes.coupDeCoeurAmorino)
app.get('/coup-de-coeur-blend', routes.coupDeCoeurBlend)
app.get('/coup-de-coeur-clint', routes.coupDeCoeurClint)
app.get('/coup-de-coeur-marie-celeste', routes.coupDeCoeurCeleste)
app.get('/coup-de-coeur-nanashi', routes.coupDeCoeurNanashi)
app.get('/scenarios-drunk', routes.scenariousDrunk)
app.get('/scenarios-pop-up-question', routes.scenariousQuestion)
app.post('/users/register', users.create)
app.get('/users/register', users.register)
app.post('/users/login', users.loginPost)
app.post('/api/users/login', users.loginPost)
app.get('/users/login', users.login)
app.get('/users/logout', users.logout)
app.get('/restaurants', restaurants.index);
app.get('/my-restaurants', restaurants.usersRestaurants);
app.get('/restaurants/add', users.admin, restaurants.add);
app.get('/restaurants/edit/:id', users.admin, restaurants.edit);
app.get('/restaurants/view/:id', restaurants.find);
app.post('/restaurants/add', users.admin, restaurants.addPost);
app.delete('/restaurants/delete', users.admin, restaurants.delete);
app.post('/restaurants/favourites/add', restaurants.addToFavourite);
app.delete('/restaurants/favourites/remove', restaurants.removeFromFavourite);
app.get('/tags', tags.index);
app.post('/tags/add', tags.add);
app.post('/tags/find', tags.find);
app.get('/places', places.index);
app.get('/places/add', users.admin, places.add);
app.post('/places/add', places.addPost);
app.post('/places/find', places.find);
app.get('/places/edit/:id',users.admin,  places.edit);
app.post('/descriptions/add', users.admin, descriptions.addPost);
app.get('/descriptions/find/:id', users.admin, descriptions.find);
app.get('/auth/facebook', passport.authenticate('facebook', { display: 'popup', scope: [ 'email'], failureRedirect: '/' }));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/users/fbSuccess',
        failureRedirect: '/users/login' }));
app.get('/users/fbSuccess', users.fbSuccess);
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
