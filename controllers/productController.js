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
    findRandomProducts: (req,res) => {
        res.send('e')
    // ACA DEBERIA IR LA LOGICA QUE RETORNE 3 PRODUCTOS RANDOM
    },

    productsList: (req, res) =>{
        const loggedUser= req.session.loggedUser;
        let userIsEmployee= false;
        if (loggedUser && loggedUser.employee == 1){
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
        const loggedUser= req.session.loggedUser;
        let userIsEmployee= false;
        if (loggedUser && loggedUser.employee == 1){
            userIsEmployee = true;
        }


        let query = "%" + req.query.searchQuery + "%";
        let slicedQuery = query.slice(0, 5)
        console.log(slicedQuery)
        function getMoreProducts(prod){
                db.Product.findAll({
                    where: {description: {[Op.like]: slicedQuery}, name: {[Op.ne]:prod.name}}
                
                })
                .then(finalProducts =>{
                    newArr = [...prod, ...finalProducts]
                    prod = [...new Set(newArr)]
                    if(prod.length > 0){
                        if(prod.length>=8){
                            // res.send(prod)r
                            res.render('search', {prod, userIsEmployee})
                        }
                        else if(prod.length >= 0 && prod.length < 8){
                            db.Product.findAll({
                                where: {category_id: prod[0].category_id, name: {[Op.ne]:prod[0].name}}
                            })
                            .then(newProd => {
                                
                                newFilteredArr = [...prod, ...newProd]
                                
                                prod = [...new Set(newFilteredArr)]
                               
                                if(prod.length > 0){
                                    res.render('search', {prod, userIsEmployee})
                                    // res.send(prod)
                                }
                                else{
                                    res.render('search', {prod: undefined, userIsEmployee})
                                    // res.send('nosirve')
                                }
                            })
                        
                            }
                    }else{
                        res.render('search', {prod: undefined, userIsEmployee})
                    }
                })
        }

        db.Product.findAll({
            where: {name: {[Op.like]: query}}
        })
        .then(data => {
            if(data.length >= 8){
                res.render('search', {prod: data, userIsEmployee})
                // res.send(data)
            }
            else if(data.length<8){
                getMoreProducts(data)
            }
           
        })
    }, 

    categories: (req, res)=>{
        const loggedUser= req.session.loggedUser;
        let userIsEmployee= false;
        if (loggedUser && loggedUser.employee == 1){
            userIsEmployee = true;
        }
        let categoryId= req.params.categoryId;
        db.Product.findAll({
            where: {
                category_id: categoryId
            }
        })
            .then(requestedProducts=>{
                let products= {
                    products: requestedProducts, 
                    userIsEmployee
                }
                return res.render('productsList', products)
            })
            .catch(error => { res.send(error)});
    },

    detail: (req, res)=>{
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
    const loggedUser= req.session.loggedUser;
    let userIsEmployee= false;
    if (loggedUser && loggedUser.employee == 1){
        userIsEmployee = true;
    }
    let data = {}
        db.Product.findByPk(req.params.id)
        .then((productDetail) => {
            return data= {
                productParam: productDetail, 
                recommended: similarProducts,
                userIsEmployee: userIsEmployee
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
            categoryValue =  parseInt(req.body.category)
            db.Product.create({
                name: req.body.name,
                brand: req.body.brand, 
                price: req.body.price,
                description: req.body.description,
                discount: req.body.discount,
                capacity: req.body.capacity,
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
        db.Product.findByPk(req.params.id)
            .then(foundProduct => {
                if(foundProduct){
                    productToEdit= {
                        productToEdit: foundProduct
                    }
                    return res.render('editForm', productToEdit);
                }
            })
            .catch(error => {res.send(error)} )
    },

    edit: (req,res)=>{
        let errors = validationResult(req);
        if(errors.isEmpty()){
            let categoryValue =  parseInt(req.body.category)
            let idProduct= req.params.id;
            db.Product.update(
                {
                name: req.body.name, 
                brand: req.body.brand,
                price: req.body.price,
                discount: req.body.discount, 
                capacity: req.body.capacity, 
                category_id: categoryValue, 
                description: req.body.description, 
                image: req.file.filename
                }, 
                {
                    where: {id: idProduct}
                }
            )
                .then(function(){
                    let redirectionRoute= '/productos/' + idProduct;
                    return res.redirect(redirectionRoute) 
                })
                .catch(error => {res.render(error)});      
        }
        else{
                    
            return res.render('editForm', {errorMessage: errors.mapped(), old: req.body, id: req.params.id})
        }
    }
    ,
    delete: (req, res)=>{
        const idDelete= req.params.id;
        db.Product.destroy({
            where: {
                id: idDelete
            }
        })
            .then(()=>{
                res.redirect('/productos')
            })
            .catch((error) => {res.send(error)})
    },

    logOut: (req, res) => {
        res.session.destroy()
        return res.redirect('/')
    }
};

module.exports = controller;