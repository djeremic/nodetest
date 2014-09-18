var db = require('../models')

exports.index = function(req, res){
    res.render('routes/index', {
        layout: 'friendly',
        home: true
    })
}

exports.bestOf = function(req, res){
    res.render('routes/best-of', {
        layout: 'friendly',
        bestof: true
    })
}
