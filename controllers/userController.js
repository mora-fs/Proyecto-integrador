const fs= require('fs');
const { parse } = require('path');
const path= require('path');
const productsDbPath= path.join(__dirname, '../data/productsDataBase.json');
const parsedProductsDb= JSON.parse(fs.readFileSync(productsDbPath, 'utf-8'));
const indexController= require('../controllers/indexController');

const controller= {
    cart: (req, res) => {
        const productos= {
            productos: parsedProductsDb
        }
        res.render('shoppingCart', productos)
    },
    profile: (req, res) => {
        res.render('profile')
    }
}
module.exports= controller