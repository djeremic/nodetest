var db = require('../models')

exports.addPost = function(req, res) {
    var desc = req.param('desc', null);
    console.log(desc);

    db.Description.create(desc).success(function(description) {
        res.json({description: description})
    }).error(function(errors) {
        console.log(errors);
        res.statusCode(400);
        res.json({errors: errors});
    })
}
