const fs= require('fs');
const { parse } = require('path');
const path= require('path');
const productsDbPath= path.join(__dirname, '../data/productsDataBase.json');
const parsedProductsDb= JSON.parse(fs.readFileSync(productsDbPath, 'utf-8'));

const controller= {
    cart: (req, res) => {
        const productos= {
            productos: parsedProductsDb
        }
        return res.render('shoppingCart', productos)
    },
    profile: (req, res) => {
        return res.render('profile')
    }
}
module.exports= controller