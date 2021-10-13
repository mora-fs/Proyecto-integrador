let onlyEmployeeMiddleware= function (req, res, next) {
    const loggedUser= req.session.loggedUser;
    let userIsEmployee= false;
    if (loggedUser && loggedUser.employee == 1){
        userIsEmployee = true;
        next()
    } 
    else{
        return res.redirect('/productos')
    }
}
module.exports= onlyEmployeeMiddleware; 