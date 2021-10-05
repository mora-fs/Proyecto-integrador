let employeeVerification= function (req, res, next) {
    const loggedUser= req.session.loggedUser;
    let userIsEmployee= false;
    if (loggedUser && loggedUser.type == 'employee'){
        userIsEmployee = true;
    }; 
    next();
}
module.exports= employeeVerification; 