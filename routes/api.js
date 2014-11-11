/**
 * Created by Drago on 24.9.2014.
 */
var db = require('../models')
var myCache = require('../routes/cache')

exports.index = function(req, res){
    var cashedRestaurants = myCache.get("restaurants");
    if(cashedRestaurants != null && cashedRestaurants.restaurants != null){
        res.json(cashedRestaurants.restaurants);
    } else {
        fillDependences();
        db.Restaurant.findAll({where: {deleted: 0},include: [db.Place, db.Tag, db.Description], order :[[db.Description, 'id']]}).success(function(restaurants) {
            myCache.set("restaurants", restaurants, 0);
            res.json(restaurants);
        }).error(function (errors) {
            res.status(500);
            res.json({errors: errors});
        });
    }
}

exports.find = function(req, res) {
    var id = req.params.id;
    fillDependences();

    db.Restaurant.find({where: {id: id, deleted: 0},include: [db.Place, db.Tag, db.Description], order :[[db.Description, 'id']]}).success(function(restaurant){
        res.json(restaurant);
    }).error(function (errors) {
        res.status(500)
        res.json({errors: errors});
    });
}

exports.userList = function(req, res){
    if(req.header('token')){
        db.User.find({
            where: {token : req.header('token')}
        }).success(function(user){
            if(user != null){
                db.Restaurant.hasMany(db.User);
                db.User.hasMany(db.Restaurant);
                //fillDependences();
                user.getRestaurants({
                    where: {deleted: 0}//, include: [db.Place, db.Tag, db.Description], order :[[db.Description, 'id']]
                }).success(function(restaurants){
                    res.json(restaurants);
                })
            } else {
                res.status('401').json({errors : 'Unauthorized'});
            }
        }).error(function(){
            res.status('401').json({errors : 'Unauthorized'});
        });
    } else {
        res.status('401').json({errors : 'Unauthorized'});
    }
}

exports.addToFavourite = function(req, res){

    if(req.header('token')){
        db.User.find({
            where: {token : req.header('token')}
        }).success(function(user) {
            db.Restaurant.hasMany(db.User);
            db.User.hasMany(db.Restaurant);

            var restaurant = db.Restaurant.build({id: req.param('id', null)});

            user.addRestaurant(restaurant).success(function () {
                res.json(restaurant);
            }).error(function (errors) {
                res.status('500').json({errors: errors});
            });
        }).error(function(){
            res.status('401').json({errors : 'Unauthorized'});
        });
    } else {
        res.status('401').json({errors : 'Unauthorized'});
    }
}

exports.removeFromFavourite = function(req, res){
    if(req.header('token')){
        db.User.find({
            where: {token : req.header('token')}
        }).success(function(user) {
            db.Restaurant.hasMany(db.User);
            db.User.hasMany(db.Restaurant);

            var restaurant = db.Restaurant.build({id: req.param('id', null)});

            restaurant.removeUser(user).success(function () {
                res.json(restaurant);
            }).error(function (errors) {
                res.json({errors: errors});
            })
        }).error(function(){
                res.status('401').json({errors : 'Unauthorized'});
        });
    } else {
        res.status('401').json({errors : 'Unauthorized'});
    }
}

function fillDependences(){
    db.Restaurant.hasMany(db.Tag);
    db.Tag.hasMany(db.Restaurant);

    db.Restaurant.hasMany(db.Place);
    db.Place.hasMany(db.Restaurant);

    db.Restaurant.hasMany(db.Description);
}
