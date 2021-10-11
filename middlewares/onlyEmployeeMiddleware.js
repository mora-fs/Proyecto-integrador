let employeeVerification= function (req, res, next) {
    const loggedUser= req.session.loggedUser;
    let userIsEmployee= false;
    if (loggedUser && loggedUser[0].employee == 1){
        userIsEmployee = true;
        next();
    } 
    else{
        res.redirect('/productos')
    }
}
module.exports= employeeVerification; 