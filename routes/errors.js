exports.unauthorized = function(req, res){
    res.render('errors/unauthorized', {
        layout: 'friendly'
    })
}