var db = require('../models')

exports.index = function(req, res){
    db.Restaurant.findAll().success(function(restaurants) {
        res.render('index', {
            title: 'Express',
            restaurants: restaurants
        })
    })
}
