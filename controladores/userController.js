const controller= {
    carrito: (req, res) => {
        res.render('carrito');
    },
    login: (req, res) => {
        res.render('login');
    }, 
    // crear: (req, res) =>{
    //     res.render('crear-form');
    // },
    // guardarProd: (req, res) =>{
    //     res.send(req.body);
    // },
}
module.exports= controller