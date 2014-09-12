var db = require('../models')

exports.addPost = function(req, res) {
    var restaurant = req.param('restaurant', null);
    var tagIDs = req.param('tags', null);
    var placeIDs = req.param('places', null);
    var descIDs = req.param('descriptions', null);
    var tags = [];
    var places = [];
    var descriptions = [];
    restaurant.go_for = buildGoForString(req.param('goForArray', null));

    var errors = db.Restaurant.build(restaurant).validate();

    if (errors && errors.size > 0) {
        res.render('restaurants/add', {errors: errors, addRestaurant : true});
    } else {
        db.Restaurant.hasMany(db.Tag);
        db.Tag.hasMany(db.Restaurant);

        db.Restaurant.hasMany(db.Place);
        db.Place.hasMany(db.Restaurant);

        db.Restaurant.hasMany(db.Description);

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

        if(restaurant.id == null || restaurant.id == '') {
            db.Restaurant.create(restaurant).success(function (restaurant) {
                if (tags.length > 0) restaurant.setTags(tags);
                if (places.length > 0) restaurant.setPlaces(places);
                if (descriptions.length > 0) restaurant.setDescriptions(descriptions);
                res.redirect('/restaurants/view/'+restaurant.id)
            }).error(function (errors) {
                console.log(errors);
                res.render('restaurants/add', {errors: errors, addRestaurant: true});
                return;
            })
        } else {
            db.Restaurant.find(restaurant.id).success(function(model){
                model.updateAttributes(restaurant).success(function() {
                    model.setTags(tags);
                    model.setPlaces(places);
                    model.setDescriptions(descriptions);
                    res.redirect('/restaurants/view/'+restaurant.id)
                }).error(function (errors) {
                    console.log(errors);
                    res.render('restaurants/add', {errors: errors, addRestaurant: true});
                    return;
                })
            }).error(function (errors) {
                console.log(errors);
                res.render('restaurants/add', {errors: errors, addRestaurant: true});
                return;
            });
        }
    }
}

exports.add = function(req, res) {
    res.render('restaurants/add', { addRestaurant : true, partials: { desc_modal: 'partials/desc_modal'} });
}

exports.edit = function(req, res) {
    var id = req.params.id;
    db.Restaurant.hasMany(db.Tag);
    db.Tag.hasMany(db.Restaurant);

    db.Restaurant.hasMany(db.Place);
    db.Place.hasMany(db.Restaurant);

    db.Restaurant.hasMany(db.Description);

    db.Restaurant.find({where: {id: id},include: [db.Place, db.Tag, db.Description], order :[[db.Description, 'id']]}).success(function(restaurant){
        res.render('restaurants/add', { addRestaurant : true, partials: { desc_modal: 'partials/desc_modal'}, restaurant : restaurant });
    }).error(function(){
        res.render('restaurants/add', { addRestaurant : true, partials: { desc_modal: 'partials/desc_modal'} });
    });
}

exports.index = function(req, res){
    db.Restaurant.findAll().success(function(restaurants) {
        res.render('restaurants/index', {
            title: 'Express',
            restaurants: restaurants
        }).error(function (errors) {
            console.log(errors);
            res.render('restaurants/index', {errors: errors});
        });
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
        }).error(function (errors) {
            console.log(errors);
            res.render('restaurants/my', {errors: errors});
        });
    })
}

exports.addToFavourite = function(req, res){
    db.Restaurant.hasMany(db.User);
    db.User.hasMany(db.Restaurant);

    var usr = db.User.build(req.session.user);
    var restaurant = db.Restaurant.build({id : req.param('id', null)});

    usr.addRestaurant(restaurant).success(function() {
        res.json();
    }).error(function (errors) {
        console.log(errors);
        res.render('/', {errors: errors, addRestaurant: true});
    });
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

function buildGoForString(goForArray){
    var result = ''
    if(goForArray != undefined && goForArray.length > 0){
        for(var i  = 0; i < goForArray.length; i++){
            if(i == 0){
                result += goForArray[i];
            } else if(i <= goForArray.length - 2){
                result += ', ' + goForArray[i];
            } else if(i == goForArray.length - 1){
                result += ' and ' + goForArray[i];
            }
        }
    }
    return result;
}

exports.find = function(req, res) {
    var id = req.params.id;
    db.Restaurant.hasMany(db.Tag);
    db.Tag.hasMany(db.Restaurant);

    db.Restaurant.hasMany(db.Place);
    db.Place.hasMany(db.Restaurant);

    db.Restaurant.hasMany(db.Description);

    db.Restaurant.find({where: {id: id},include: [db.Place, db.Tag, db.Description], order :[[db.Description, 'id']]}).success(function(restaurant){
        res.render('restaurants/view', {restaurant : restaurant });
    }).error(function (errors) {
        console.log(errors);
        res.render('/', {errors: errors, addRestaurant: true});
    });
}
