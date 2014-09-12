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

    if(placeReq.id == null || placeReq.id == '') {
        db.Place.create(placeReq).success(function (place) {
            res.redirect('/places')
        }).error(function (errors) {
            console.log(errors);
            res.render('places/add', {errors: errors, addRestaurant: true});
            return;
        })
    } else {
        db.Place.find(placeReq.id).success(function(model){
            model.updateAttributes(placeReq).success(function() {
                res.redirect('/places');
            }).error(function (errors) {
                console.log(errors);
                res.render('places/add', {errors: errors, addRestaurant: true});
                return;
            })
        }).error(function (errors) {
            console.log(errors);
            res.render('places/add', {errors: errors, addRestaurant: true});
            return;
        });
    }
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
    }).error(function(error){
        console.log(error);
        res.render('places/index');
    });
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

exports.edit = function(req, res) {
    var id = req.params.id;

    db.Place.find({where: {id: id}}).success(function(place){
        res.render('places/add', { addRestaurant : true, place : place });
    }).error(function(){
        res.render('places/add', { addRestaurant : true});
    });
}

