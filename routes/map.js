/**
 * Created by drago.jeremic on 10/2/14.
 */

exports.start = function(req, res){
    if(req.session.user){
        res.render('maps/loged', {
            layout: 'friendly',
            map: true
        })
    } else {
        res.render('maps/unloged', {
            layout: 'friendly',
            map: true
        })
    }
}

exports.choose = function(req, res){
    res.render('maps/choose', {
        layout: 'friendly',
        map: true
    })
}