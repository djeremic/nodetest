exports.index = function(req, res){
    res.render('routes/index', {
        layout: 'final',
        home: true,
        marie: true
    })
}

exports.bestOf = function(req, res){
    res.render('routes/best-of', {
        layout: 'friendly',
        bestof: true
    })
}

exports.bestOfFrites = function(req, res){
    res.render('routes/best-of-frites', {
        layout: 'friendly',
        bestof: true
    })
}

exports.bestOfChinese = function(req, res){
    res.render('routes/best-of-chinese', {
        layout: 'friendly',
        bestof: true
    })
}

exports.bestOfCroissants = function(req, res){
    res.render('routes/best-of-croissants', {
        layout: 'friendly',
        bestof: true
    })
}

exports.bestOfBreads = function(req, res){
    res.render('routes/best-of-breads', {
        layout: 'friendly',
        bestof: true
    })
}

exports.coupDeCoeurAbri = function(req, res){
    res.render('routes/coup-de-coeur-abri', {
        layout: 'friendly',
        coeur: true
    })
}

exports.coupDeCoeurAki = function(req, res){
    res.render('routes/coup-de-coeur-aki', {
        layout: 'friendly',
        coeur: true
    })
}

exports.coupDeCoeurAmorino = function(req, res){
    res.render('routes/coup-de-coeur-amorino', {
        layout: 'friendly',
        coeur: true
    })
}

exports.coupDeCoeurBlend = function(req, res){
    res.render('routes/coup-de-coeur-blend', {
        layout: 'friendly',
        coeur: true
    })
}

exports.coupDeCoeurClint = function(req, res){
    res.render('routes/coup-de-coeur-clint', {
        layout: 'friendly',
        coeur: true
    })
}

exports.coupDeCoeurCeleste = function(req, res){
    res.render('routes/coup-de-coeur-marie-celeste', {
        layout: 'friendly',
        coeur: true
    })
}

exports.coupDeCoeurNanashi = function(req, res){
    res.render('routes/coup-de-coeur-nanashi', {
        layout: 'friendly',
        coeur: true
    })
}

exports.scenariousDrunk = function(req, res){
    res.render('routes/scenarios-drunk', {
        layout: 'friendly',
        scenarious: true
    })
}

exports.scenariousQuestion = function(req, res){
    res.render('routes/scenarios-pop-up-question', {
        layout: 'friendly',
        scenarious: true
    })
}





