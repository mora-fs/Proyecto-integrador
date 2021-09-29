const indexController= require('../controllers/indexController');
module.exports= function(req, res, next){
    if(req.session.loggedUser){
        return res.render('profile')
        next()
    }
    else{
        res.render('login')
    }
}