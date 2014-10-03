/**
 * Created by drago.jeremic on 10/3/14.
 */

var db = require('../models')

exports.addPost = function(req, res) {
    var arrondisementReq = req.param('arrondisement', null);

    var errors = db.Arrondisement.build(arrondisementReq).validate();

    if (errors && errors.size > 0) {
        res.render('arrondisements/add', {errors: errors, addRestaurant : true});
        return;
    }

    if(arrondisementReq.id == null || arrondisementReq.id == '') {
        db.Arrondisement.create(arrondisementReq).success(function (arrondisement) {
            res.redirect('/arrondisements')
        }).error(function (errors) {
            console.log(errors);
            res.render('arrondisements/add', {errors: errors, addRestaurant: true});
            return;
        })
    } else {
        db.Arrondisement.find(arrondisementReq.id).success(function(model){
            model.updateAttributes(arrondisementReq).success(function() {
                res.redirect('/arrondisements');
            }).error(function (errors) {
                console.log(errors);
                res.render('arrondisements/add', {errors: errors, addRestaurant: true});
                return;
            })
        }).error(function (errors) {
            console.log(errors);
            res.render('arrondisements/add', {errors: errors, addRestaurant: true});
            return;
        });
    }
}

exports.add = function(req, res) {
    res.render('arrondisements/add', { addRestaurant : true});
}

exports.index = function(req, res){
    db.Arrondisement.findAll().success(function(arrondisements) {
        res.render('arrondisements/index', {
            title: 'Arrondisement',
            arrondisements: arrondisements
        })
    }).error(function(error){
        console.log(error);
        res.render('arrondisements/index');
    });
}

exports.edit = function(req, res) {
    var id = req.params.id;

    db.Arrondisement.find({where: {id: id}}).success(function(arrondisement){
        res.render('arrondisements/add', { addRestaurant : true, place : arrondisement });
    }).error(function(){
        res.render('arrondisements/add', { addRestaurant : true});
    });
}

