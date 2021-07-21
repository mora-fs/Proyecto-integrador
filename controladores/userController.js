const controller= {
    carrito: (req, res) => {
        res.render('carrito');
    },
    login: (req, res) => {
        res.render('login');
    } 
}
module.exports= controller