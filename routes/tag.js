/**
 * Created by drago.jeremic on 8/28/14.
 */
var db = require('../models')

exports.add = function(req, res) {
    var tag = req.param('tag', null);

    db.Tag.create(tag).success(function(saved) {
        res.json({tag: saved})
    }).error(function(errors) {
        console.log(errors);
        res.json({errors: errors});
    })
}

exports.index = function(req, res){
    db.Tag.findAll().success(function(tags) {
        res.json(tags);
    })
}

exports.find = function(req, res){
    var value = req.param('query', null);
    if(value == undefined){
        value = '';
    }
    console.log(value);
    db.Tag.findAll({
        where: ["name LIKE ?", value+"%"]
    }).success(function(tags) {
        res.json(tags);
    }).error(function(errors){
        res.renderJson({errors: errors});
    })
}
