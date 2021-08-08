const controller = {
    home: (req, res)=>{
        return res.render('home')
    }, 
    register: (req, res)=>{
        return res.render('register')
    }, 
    login: (req, res)=>{
        return res.render('login')
    }
}
module.exports = controller