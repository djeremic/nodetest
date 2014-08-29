var db = require('../models')

exports.addPost = function(req, res) {
    var restaurant = req.param('restaurant', null);
    var tagIDs = req.param('tags', null);
    var restModel = db.Restaurant.build(restaurant);
    var tags = [];

    db.Restaurant.hasMany(db.Tag);
    db.Tag.hasMany(db.Restaurant);

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


    db.Restaurant.create(restaurant).success(function(restaurant) {
        if(tags.length > 0) restaurant.setTags(tags);
        res.redirect('/restaurants')
    }).error(function(errors) {
        console.log(errors);
        res.render('restaurants/add', {errors: errors, addRestaurant : true});
        return;
    })
}

exports.add = function(req, res) {
    res.render('restaurants/add', { addRestaurant : true});
}

exports.index = function(req, res){
    db.Restaurant.findAll().success(function(restaurants) {
        res.render('restaurants/index', {
            title: 'Express',
            restaurants: restaurants
        })
    })
}