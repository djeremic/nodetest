/**
 * Created by drago.jeremic on 9/4/14.
 */
var db = require('../models')

exports.addPost = function(req, res) {
    var placeReq = req.param('place', null);

    var errors = db.Place.build(placeReq).validate();

    if (errors && errors.size > 0) {
        res.render('places/add', {errors: errors, addRestaurant : true});
        return;
    }

    db.Place.create(placeReq).success(function(place) {
        res.redirect('/places')
    }).error(function(errors) {
        console.log(errors);
        res.render('places/add', {errors: errors, addRestaurant : true});
        return;
    })
}

exports.add = function(req, res) {
    res.render('places/add', { addRestaurant : true});
}

exports.index = function(req, res){
    db.Place.findAll().success(function(places) {
        res.render('places/index', {
            title: 'Places',
            places: places
        })
    })
}

exports.find = function(req, res){
    var value = req.param('query', null);
    if(value == undefined){
        value = '';
    }

    db.Place.findAll({
        where: ["name LIKE ?", value+"%"]
    }).success(function(tags) {
        res.json(tags);
    }).error(function(errors){
        res.renderJson({errors: errors});
    })
}

