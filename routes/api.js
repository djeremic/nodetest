/**
 * Created by Drago on 24.9.2014.
 */
var db = require('../models')

exports.index = function(req, res){
    fillDependences();
    db.Restaurant.findAll({where: {deleted: 0},include: [db.Place, db.Tag, db.Description], order :[[db.Description, 'id']]}).success(function(restaurants) {
        res.json(restaurants);
    }).error(function (errors) {
        res.status(500);
        res.json({errors: errors});
    });
}

exports.find = function(req, res) {
    var id = req.params.id;
    fillDependences();

    db.Restaurant.find({where: {id: id, deleted: 0},include: [db.Place, db.Tag, db.Description], order :[[db.Description, 'id']]}).success(function(restaurant){
        res.json(restaurant);
    }).error(function (errors) {
        res.status(500)
        res.json({errors: errors});
    });
}

function fillDependences(){
    db.Restaurant.hasMany(db.Tag);
    db.Tag.hasMany(db.Restaurant);

    db.Restaurant.hasMany(db.Place);
    db.Place.hasMany(db.Restaurant);

    db.Restaurant.hasMany(db.Description);
}
