var db = require('../models')

exports.addPost = function(req, res) {
    var restaurant = req.param('restaurant', null);
    var tagIDs = req.param('tags', null);
    var placeIDs = req.param('places', null);
    var descIDs = req.param('descriptions', null);
    var tags = [];
    var places = [];
    var descriptions = [];

    db.Restaurant.hasMany(db.Tag);
    db.Tag.hasMany(db.Restaurant);

    db.Restaurant.hasMany(db.Place);
    db.Place.hasMany(db.Restaurant);

    db.Restaurant.hasMany(db.Description);

    var errors = db.Restaurant.build(restaurant).validate();

    if (errors && errors.size > 0) {
        res.render('restaurants/add', {errors: errors, addRestaurant : true});
        return;
    }

    if (tagIDs) {
        for (var i = 0; i < tagIDs.length; i++) {
            tags.push(db.Tag.build({id: parseInt(tagIDs[i])}));
        }
    }

    if (placeIDs) {
        for (var i = 0; i < placeIDs.length; i++) {
            places.push(db.Place.build({id: parseInt(placeIDs[i])}));
        }
    }

    if (descIDs) {
        for (var i = 0; i < descIDs.length; i++) {
            descriptions.push(db.Description.build({id: parseInt(descIDs[i])}));
        }
    }


    db.Restaurant.create(restaurant).success(function(restaurant) {
        if(tags.length > 0) restaurant.setTags(tags);
        if(places.length > 0) restaurant.setPlaces(places);
        if(descriptions.length > 0) restaurant.setDescriptions(descriptions);
        res.redirect('/restaurants')
    }).error(function(errors) {
        console.log(errors);
        res.render('restaurants/add', {errors: errors, addRestaurant : true});
        return;
    })
}

exports.add = function(req, res) {
    res.render('restaurants/add', { addRestaurant : true, partials: { desc_modal: 'partials/desc_modal'} });
}

exports.index = function(req, res){
    db.Restaurant.findAll().success(function(restaurants) {
        res.render('restaurants/index', {
            title: 'Express',
            restaurants: restaurants
        })
    })
}

exports.usersRestaurants = function(req, res){
    db.Restaurant.hasMany(db.User);
    db.User.hasMany(db.Restaurant);

    var usr = db.User.build(req.session.user);

    usr.getRestaurants().success(function(restaurants) {
        res.render('restaurants/my', {
            title: 'My List',
            restaurants: restaurants
        })
    })
}

exports.addToFavourite = function(req, res){
    db.Restaurant.hasMany(db.User);
    db.User.hasMany(db.Restaurant);

    var usr = db.User.build(req.session.user);
    var restaurant = db.Restaurant.build({id : req.param('id', null)});

    usr.addRestaurant(restaurant).success(function() {
        res.json();
    })
}

exports.removeFromFavourite = function(req, res){
    db.Restaurant.hasMany(db.User);
    db.User.hasMany(db.Restaurant);

    var usr = db.User.build(req.session.user);
    var restaurant = db.Restaurant.build({id : req.param('id', null)});

    restaurant.removeUser(usr).success(function() {
        res.json({});
    }).error(function(errors) {
        res.json({errors: errors});
    })
}

