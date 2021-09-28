module.exports= function(req, res, next){
    console.log(req.session.loggedUser);
    if (!req.session.loggedUser) {
        res.redirect('/login');
    }
    else{
        next();
    }
}