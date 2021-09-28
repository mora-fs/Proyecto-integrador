module.exports= function(req, res){
    if (req.session.loggedUser) {
        require('../controllers/userController')
    }
    else{
        res.redirect('login');
    }
}