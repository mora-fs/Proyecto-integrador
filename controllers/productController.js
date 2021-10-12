const { equal } = require('assert');
const fs= require('fs');
const { parse } = require('path');
const path= require('path');
const productsDbPath= path.join(__dirname, '../data/productsDataBase.json');
const parsedProductsDb= JSON.parse(fs.readFileSync(productsDbPath, 'utf-8'));

const db = require('../database/models');
const Op = db.Sequelize.Op

const {validationResult} = require('express-validator');
const Product = require('../database/models/Product');
const { createBrotliCompress } = require('zlib');
/* const onlyEmployeeMiddleware= require('../middlewares/onlyEmployeeMiddleware');
 */
const controller = {
    findRandomProducts: () => {
    // ACA DEBERIA IR LA LOGICA QUE RETORNE 3 PRODUCTOS RANDOM
    },

    productsList: (req, res) =>{
        const loggedUser= req.session.loggedUser;
        let userIsEmployee= false;
        if (loggedUser && loggedUser.type == 'employee'){
            userIsEmployee = true;
        }
        
        db.Product.findAll()
        .then(allProducts => {
            let products= {
                products: allProducts, 
                userIsEmployee
            };
            return res.render('productsList', products);

        })
        .catch(error => { res.send(error)});
    },

    searchProduct: (req, res)=>{
        
    }, 

    categories: (req, res)=>{

    },

    detail: (req, res)=>{
        const loggedUser= req.session.loggedUser;
        let userIsEmployee= false;
        if (loggedUser && loggedUser.type == 'employee'){
            userIsEmployee = true;
        };

        // ESTA LOGICA DE MOSTRAR PRODUCTOS RELACIONADOS NO LA PUDE HACER DENTRO DE ESTE MISMO METODO, PORQUE HABIAN ERRORES 
        // CON EL TEMA DEL .then     
        // ESTO CREO QUE ES MEJOR HACERLO EN EL METODO AL PRINCIPIO DEL CONTROLADOR UQE SE LLAMA findRandomProduct, Y LLAMAR
// ESE METODO ACÁ, DE MOMENTO DEJO LA LOGICA DE JSON PARA ENCONTRAR PRODUCTOS RELACIONADOS
    let similarProducts= [];
    for (i=0; i<3; i++){
        let randomId= Math.round(Math.random() * parsedProductsDb.length);
        let randomProduct= parsedProductsDb.find((product)=> product.id == randomId);
        similarProducts.push(randomProduct)
    }


// 
// 
// 

    let data = {}
        db.Product.findByPk(req.params.id)
        .then(productDetail => {
            return data= {
                productParam: productDetail, 
                recommended: similarProducts,
                userIsEmployee
            }
        })
        .then(data => {
            return res.render('detail', data)
        })
        .catch(error => { res.send(error)})
    },

    createForm: (req,res) => {
        return res.render('createForm');
    },
    createProduct: (req, res) =>{
        let errors = validationResult(req);
        if(errors.isEmpty()){
            console.log(req.file.filename)
            categoryValue =  parseInt(req.body.category)
            db.Product.create({
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                discount: req.body.discount,
                capacity: req.body.cantidad,
                image: req.file.filename,
                category_id: categoryValue
            })
            .then(data => {
            return res.redirect('/productos')})
            .catch(error => { res.send(error)})
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
    },

    logOut: (req, res) => {
        res.session.destroy()
        return res.redirect('/')
    }
};

module.exports = controller;