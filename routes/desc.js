var db = require('../models')

exports.addPost = function(req, res) {
    var desc = req.param('desc', null);

    if(desc.id == null || desc.id == '') {
        db.Description.create(desc).success(function (description) {
            res.json({description: description})
        }).error(function (errors) {
            console.log(errors);
            res.status(500);
            res.json({errors: errors});
        })
    } else {
        db.Description.find(desc.id).success(function(model){
            model.updateAttributes(desc).success(function() {
                res.json({description: model})
            }).error(function (errors) {
                res.status(500);
                res.json({errors: errors});
            })
        }).error(function (errors) {
            console.log(errors);
            res.status(500);
            res.json({errors: errors});
        });
    }
}

exports.find = function(req, res) {
    var id = req.params.id;
    console.log(id);

    db.Description.find({where: {id: id}}).success(function(description){
        res.json({description: description});
    }).error(function (errors) {
        console.log(errors);
        res.status(500);
        res.json({errors: errors});
    });
}
