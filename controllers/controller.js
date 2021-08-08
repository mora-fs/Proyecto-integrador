const controlador = {
    cart: (req, res) => {
        res.render('cart');
    },
    product: (req, res)=>{
        res.render('productsList');
    },
    login: (req, res) => {
        res.render('login');
    },
    loginValidacion: (req, res) => {
        
    } 
};

module.exports = controlador;