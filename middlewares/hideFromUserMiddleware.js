const indexController= require('../controllers/indexController');
module.exports= function(req, res){
    if(req.session.loggedUser){
        return res.render('profile')
    }
    else{
        res.render('login')
    }
}