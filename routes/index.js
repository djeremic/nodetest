var db = require('../models')

exports.index = function(req, res){
    res.render('routes/index', {
        layout: 'friendly'
    })
}
