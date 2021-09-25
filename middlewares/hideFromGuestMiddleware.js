module.exports= function(req, res){
    if (req.session.loggedUser){
        return res.redirect('/usuario/cart'); 
    }
    else{
        return res.render('login'); 
    }
}