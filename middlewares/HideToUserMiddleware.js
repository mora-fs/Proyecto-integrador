module.exports= function(req, res){
    if(req.session.loggedUser){
        return res.redirect('usuario/profile')
    }
    else{
        res.render('login')
    }
}