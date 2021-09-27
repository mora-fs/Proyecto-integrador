const fs= require('fs');
const { parse } = require('path');
const path= require('path');
const productsDbPath= path.join(__dirname, '../data/productsDataBase.json');
const parsedProductsDb= JSON.parse(fs.readFileSync(productsDbPath, 'utf-8'));


const session = require('express-session');

const controller= {
    cart: (req, res) => {
        if(req.session.productsOnCart){
            productos = req.session.productsOnCart
        }
        else{
            productos = undefined
        }
        console.log(req.session.productsOnCart)
        return res.render('shoppingCart', productos)
    },

    addToCart: (req,res) => {
        const idDetail= req.params.id;
        const productToAdd= parsedProductsDb.find(product=> product.id == idDetail);

        if(req.session.productsOnCart){
            req.session.productsOnCart.push(productToAdd)
        }
        else{
            req.session.productsOnCart = []
            
            req.session.productsOnCart.push(productToAdd)
        }

        redirectionRoute = '/productos/' + idDetail;

        res.redirect(redirectionRoute)
    },

    deleteFromCart: (req,res) => {
        // let productToDelete = req.session.productsOnCart.find(product => product.id == req.params.id);
        req.session.productsOnCart = req.session.productsOnCart.filter(product => product.id != req.params.id)
        res.redirect('/usuario/cart')

    },

    profile: (req, res) => {
        return res.render('profile')
    }
}
module.exports= controller