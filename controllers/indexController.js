const controller = {
    home: (req, res)=>{
        return res.render('home')
    }, 
    register: (req, res)=>{
        return res.render('register')
    }, 
    login: (req, res)=>{
        return res.render('login')
    },
    cart: (req, res) => {
        return res.render('shoppingCart')
    }
}
module.exports = controller