/**
 * Created by drago.jeremic on 11/25/14.
 */

var db = require('../models')

exports.add = function(req, res){
    var rate = req.param('rate', null);
    console.log(req.params);

    if(req.header('token')){
        db.User.find({
            where: {token : req.header('token')}
        }).success(function(user) {
            db.Restaurant.hasMany(db.Rate);
            db.User.hasMany(db.Rate);
            db.Rate.hasOne(db.Restaurant);
            db.Rate.hasOne(db.User);

            var restaurant = db.Restaurant.build({id: rate.RestaurantId});
            rate.UserId = user.id;

            db.Rate.create(rate).success(function (model) {
                res.json({rate: model});
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


exports.find = function(req, res){
    if(req.header('token')){
        db.User.find({
            where: {token : req.header('token')}
        }).success(function(user) {
            db.Rate.findAll({
                where: {UserId: user.id}
            }).success(function(rates){
                res.json(rates);
            }).error(function(errors){
                res.status('500').json({errors: errors});
            })
        }).error(function(){
            res.status('401').json({errors : 'Unauthorized'});
        });
    } else {
        res.status('401').json({errors : 'Unauthorized'});
    }
}