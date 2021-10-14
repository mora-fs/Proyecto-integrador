const fs= require('fs');
const { parse } = require('path');
const path= require('path');
const productsDbPath= path.join(__dirname, '../data/productsDataBase.json');
const parsedProductsDb= JSON.parse(fs.readFileSync(productsDbPath, 'utf-8'));
const indexController= require('../controllers/indexController');

const db = require('../database/models')

const session = require('express-session');

const controller= {
    cart: (req, res) => {
        if(req.session.productsOnCart){
            productos = req.session.productsOnCart
        }
        else{
            productos = undefined
        }
        let productsRelacionados= [];
        for (i=0; i<3; i++){
            let randomId= Math.round(Math.random() * parsedProductsDb.length);
            let randomProduct= parsedProductsDb.find((product)=> product.id == randomId);
            productsRelacionados.push(randomProduct)
        }
        let products= {
            productsInCart: productos, 
            productsRecommend: productsRelacionados
        };
        return res.render('shoppingCart', products)
    },

    addToCart: (req,res) => {
        const idDetail= req.params.id;
        // const productToAdd= parsedProductsDb.find(product=> product.id == idDetail);
        // productToAdd.quantity = req.body.quantity;
        db.Product.findByPk(req.params.id)
        .then(productToAdd => {
            productToAdd.quantity = req.body.quantity
            if(req.session.productsOnCart){
                req.session.productsOnCart.push(productToAdd)
            }
            else{
                req.session.productsOnCart = []
                
                req.session.productsOnCart.push(productToAdd)
            }
    
            redirectionRoute = '/productos/' + idDetail;
    
            return res.redirect(redirectionRoute)
            // res.send(productToAdd)
        })
    },



    deleteFromCart: (req,res) => {
        // req.session.productsOnCart = req.session.productsOnCart.filter(product => product.id != req.params.id)

        // // en el siguiente metodo busco con indexOf el indice del producto a eliminar
        let index = req.session.productsOnCart.findIndex(product => product.id == req.params.id)

        req.session.productsOnCart.splice(index,1)
        // console.log(req.session.productsOnCart)
        res.redirect('/cuenta/cart')

    },

    profile: (req, res) => {
        const loggedUser= req.session.loggedUser;
        const user= {
            user: loggedUser
        };
        res.render('profile', user)
    },
    editProfileForm: (req,res) => {
        let user = req.session.loggedUser
        console.log(user)
        res.render('editProfile', {user})
    },

    editProfile: (req,res)=>{
        // let newFile;
        // if(req.file){
        //     newFile = req.file.filename
        // }
        // else{newFile = req.session.loggedUser.profileImage}
        let newName= req.body.nombre
        let newLastName = req.body.apellido
        let newEmail = req.body.email
        db.User.update(
            {
                name: newName,
                lastName: newLastName,
                // password:req.body.contraseña,
                email: newEmail
                // profileImage: newFile
            },
            {
                where: {id: parseInt(req.params.id)}
            }
        )
        .then(data => {
            console.log(data)
            db.User.findByPk(req.params.id)
            .then(user => {
                console.log(user)
                req.session.loggedUser = user;
                res.redirect('/')
            })
        })
    } ,

    logOut: (req, res) => {
        req.session.destroy()
        return res.redirect('/')
    }
}
module.exports= controller