var db = require('../models')

exports.addPost = function(req, res) {
    var restaurant = req.param('restaurant', null);
    db.Restaurant.create(restaurant).success(function() {
        res.redirect('/restaurants')
    }).error(function(errors) {
        console.log(errors);
        res.render('restaurants/add', {errors: errors});
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