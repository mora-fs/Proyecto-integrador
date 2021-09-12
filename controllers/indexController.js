const fs= require('fs');
const { parse } = require('path');
const path= require('path');
const productsDbPath= path.join(__dirname, '../data/productsDataBase.json');
const parsedProductsDb= JSON.parse(fs.readFileSync(productsDbPath, 'utf-8'));
module.exports = {
    home: (req, res)=>{
        const productos= {
            productos: parsedProductsDb
        }
        return res.render('home', productos)
    }, 
    register: (req, res)=>{
        return res.render('register')
    }, 
    registerSave: (req, res)=>{

    },
    login: (req, res)=>{
        return res.render('login')
    },
    loginSave: (req, res)=>{

    },
}