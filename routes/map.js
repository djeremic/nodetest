/**
 * Created by drago.jeremic on 10/2/14.
 */
var db = require('../models');
var fs = require("fs");

exports.start = function(req, res){
    if(req.session.user){
        res.render('maps/loged', {
            layout: 'friendly',
            map: true
        })
    } else {
        res.render('maps/unloged', {
            layout: 'friendly',
            map: true
        })
    }
}

exports.choose = function(req, res){
    res.render('maps/choose', {
        layout: 'friendly',
        map: true
    })
}

exports.choosePost = function(req, res){
    if(!req.session.user){
        res.redirect("/map")
    } else {
        var map = req.param('map', null);
        if(!map.id){
            map.id = random(1000, 10000000);
        }

        if(!map.map || map.map == ''){
            res.render('maps/choose', {
                layout: 'friendly',
                error: 'You have to choose a map in order to proceed',
                map: true
            })
        } else {
            db.Map.belongsTo(db.User);
            db.Map.create(map).success(function(map){
                map.setUser(db.User.build(req.session.user));
                res.redirect("/map/" + map.id + "/landmarks")
            }).error(function(error){
                console.error(error);
                res.render('maps/landmarks', {
                    layout: 'friendly',
                    error: 'There has been a problem with processing your request, please try again',
                    map: true
                })
            });
        }
    }
}

exports.landmarks = function(req, res){
    var id = req.params.id;
    res.render('maps/landmarks', {
        layout: 'friendly',
        id: id,
        map: true
    })
}

exports.landmarksPost = function(req, res){
    var map = req.param('map', null);
    var lndmrkIDs = req.param('landmarks', null);
    var arrondIDs = req.param('arrondisements', null);
    var lndmrks = [];
    var arronds = [];

    db.Map.hasMany(db.Landmark);
    db.Landmark.hasMany(db.Map);

    db.Map.hasMany(db.Arrondisement);
    db.Arrondisement.hasMany(db.Map);

    if (lndmrkIDs) {
        for (var i = 0; i < lndmrkIDs.length; i++) {
            lndmrks.push(db.Landmark.build({id: parseInt(lndmrkIDs[i])}));
        }
    }

    if (arrondIDs) {
        for (var i = 0; i < arrondIDs.length; i++) {
            arronds.push(db.Arrondisement.build({id: parseInt(arrondIDs[i])}));
        }
    }
    var mapModel = db.Map.build(map);

    if (lndmrks.length > 0) mapModel.setLandmarks(lndmrks);
    if (arronds.length > 0) mapModel.setArrondisements(arronds);
    res.redirect('/map/'+map.id+'/upload');

}

exports.upload = function(req, res){
    var id = req.params.id;
    res.render('maps/upload', {
        layout: 'friendly',
        id: id,
        map: true
    })
}

exports.uploadPost = function(req, res){
    var id = req.param('id', null);
    console.log(req.files.photo)

    if(!req.session.user){
        res.redirect('/map')
    } else {
        db.Map.find(id).success(function (map) {
            map.updateAttributes({
                photo: req.files.photo ? '/' + req.files.photo.name : null,
                status: 'active'
            }).success(function () {
                db.Map.hasMany(db.Restaurant)
                db.Restaurant.hasMany(db.Map)
                db.User.hasMany(db.Restaurant)
                db.Restaurant.hasMany(db.User)


                var usr = db.User.build(req.session.user);

                usr.getRestaurants().success(function(restaurants) {
                    map.setRestaurants(restaurants);
                    res.redirect('/map/' + id + '/view');
                }).error(function(error){
                    res.render('maps/upload', {
                        layout: 'friendly',
                        error: 'Error uploading image, please try again',
                        id: id,
                        map: true
                    })
                })
            }).error(function (error) {
                console.log(error)
                res.render('maps/upload', {
                    layout: 'friendly',
                    error: 'Error uploading image, please try again',
                    id: id,
                    map: true
                })
            })
        }).error(function (error) {
            console.log(error)
            res.render('maps/upload', {
                layout: 'friendly',
                error: 'Error uploading image, please try again',
                id: id,
                map: true
            })
        })
    }
}

exports.view = function(req, res){
    var id = req.params.id;
    db.Map.hasMany(db.Restaurant)
    db.Restaurant.hasMany(db.Map)
    db.Map.hasMany(db.Landmark);
    db.Landmark.hasMany(db.Map);
    db.Map.hasMany(db.Arrondisement);
    db.Arrondisement.hasMany(db.Map);

    db.Map.find({
        where: {id : id, status: 'active'},
        include: [db.Restaurant, db.Landmark, db.Arrondisement]
    }).success(function(map) {
        res.render('maps/view', {
            layout: 'friendly',
            map: map
        })
    }).error(function(error) {
        res.render('maps/view', {
            layout: 'friendly',
            error: 'Map is not found',
            map: true
        })
    });
}

function random (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}