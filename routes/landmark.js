/**
 * Created by drago.jeremic on 10/3/14.
 */

var db = require('../models')

exports.addPost = function(req, res) {
    var landmarkReq = req.param('landmark', null);

    var errors = db.Landmark.build(landmarkReq).validate();

    if (errors && errors.size > 0) {
        res.render('landmarks/add', {errors: errors, addRestaurant : true});
        return;
    }

    if(landmarkReq.id == null || landmarkReq.id == '') {
        db.Landmark.create(landmarkReq).success(function (landmark) {
            res.redirect('/landmarks')
        }).error(function (errors) {
            console.log(errors);
            res.render('landmarks/add', {errors: errors, addRestaurant: true});
            return;
        })
    } else {
        db.Landmark.find(landmarkReq.id).success(function(model){
            model.updateAttributes(landmarkReq).success(function() {
                res.redirect('/landmarks');
            }).error(function (errors) {
                console.log(errors);
                res.render('landmarks/add', {errors: errors, addRestaurant: true});
                return;
            })
        }).error(function (errors) {
            console.log(errors);
            res.render('landmarks/add', {errors: errors, addRestaurant: true});
            return;
        });
    }
}

exports.add = function(req, res) {
    res.render('landmarks/add', { addRestaurant : true});
}

exports.index = function(req, res){
    db.Landmark.findAll().success(function(landmarks) {
        res.render('landmarks/index', {
            title: 'Landmark',
            landmarks: landmarks
        })
    }).error(function(error){
        console.log(error);
        res.render('landmarks/index');
    });
}

exports.edit = function(req, res) {
    var id = req.params.id;

    db.Landmark.find({where: {id: id}}).success(function(landmark){
        res.render('landmarks/add', { addRestaurant : true, place : landmark });
    }).error(function(){
        res.render('landmarks/add', { addRestaurant : true});
    });
}

