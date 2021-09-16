const { equal } = require('assert');
const fs= require('fs');

const { parse } = require('path');

const path= require('path');
const productsDbPath= path.join(__dirname, '../data/productsDataBase.json');
const parsedProductsDb= JSON.parse(fs.readFileSync(productsDbPath, 'utf-8'));

const {validationResult} = require('express-validator');



const controller = {
    productsList: (req, res) =>{
        let products= {
            products: parsedProductsDb
        };
        return res.render('productsList', products);
    },
    detail: (req, res)=>{
        idDetail= req.params.id;
        productDetail= parsedProductsDb.find(product=> product.id == idDetail);
        const productParam= {
            productParam: productDetail
        };
        if (!productDetail){
            return res.send('El producto solicitado no se encontró');
        }
        return res.render('detail', productParam);
    },
    createForm: (req,res) => {
        return res.render('createForm');
    },
    createProduct: (req, res) =>{
        let errors = validationResult(req);
        if(errors.isEmpty()){
            let idLastProduct = (parsedProductsDb.length)-1;
            let idNewProduct = parsedProductsDb[idLastProduct].id + 1;

            let newProduct = {};

            newProduct.id = idNewProduct;
            newProduct.name = req.body.name;
            newProduct.marca = req.body.marca;
            newProduct.price = req.body.price;
            newProduct.discount = req.body.discount;
            newProduct.image = req.file.filename;
            // newProduct.color = req.body.color;
            newProduct.stock = req.body.cantidad;
            newProduct.description = req.body.description;
            newProduct.category = req.body.category;

            parsedProductsDb.push(newProduct)
            // console.log(finalProduct)
            fs.writeFileSync(productsDbPath, JSON.stringify(parsedProductsDb))

            let redirectionRoute = '/productos/' + newProduct.id;
            return res.redirect(redirectionRoute)
        }
        else{
            return res.render('createForm', {errorMessage: errors.mapped(), old: req.body})
        }
    },
    editForm: (req, res)=>{
        let idEdit= req.params.id;
        let productEdit= parsedProductsDb.find(producto=>producto.id == idEdit);
        if (productEdit){
            let editParam = {
                editParam: productEdit
            }
            return res.render('editForm', editParam);
        }
        else {
            return res.send("Producto no encontrado...");
        }
    },

    edit: (req,res)=>{
        // aca va la logica que edita los datos del producto en la base de datos
        let idEdit= req.params.id;
        let arrayPosition = idEdit -1;
        parsedProductsDb[arrayPosition].name = req.body.name;
        parsedProductsDb[arrayPosition].marca = req.body.marca;
        parsedProductsDb[arrayPosition].price = req.body.price;
        parsedProductsDb[arrayPosition].discount = req.body.discount;
        // parsedProductsDb[arrayPosition].image = req.file.filename;
        parsedProductsDb[arrayPosition].stock = req.body.cantidad;
        parsedProductsDb[arrayPosition].description = req.body.description;
        parsedProductsDb[arrayPosition].category = req.body.category;

        fs.writeFileSync(productsDbPath, JSON.stringify(parsedProductsDb))
        let redirectionRoute = '/productos/' + parsedProductsDb[arrayPosition].id;
       
        return res.redirect(redirectionRoute)        
    }
    ,
    delete: (req, res)=>{
        const idDelete= req.params.id;
        const notDeleted= parsedProductsDb.filter(producto=> producto.id != idDelete);
        fs.writeFileSync(productosDbPath, JSON.stringify(notDeleted, null, 2));
        res.render('productsList')
    }
};

module.exports = controller;