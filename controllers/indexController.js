const fs= require('fs');
const { parse } = require('path');
const path= require('path');

const productsDbPath= path.join(__dirname, '../data/productsDataBase.json');
const parsedProductsDb= JSON.parse(fs.readFileSync(productsDbPath, 'utf-8'));
const usersDbPath = path.join(__dirname, '../data/usersDataBase.json');
const parsedUsersDb= JSON.parse(fs.readFileSync(usersDbPath, 'utf-8'));

const {validationResult} = require('express-validator');

controller = {
    home: (req, res)=>{
        const productos= {
            productos: parsedProductsDb
        }
        return res.render('home', productos)
    }, 

    registerForm: (req, res)=>{
        return res.render('register')
    }, 
    register: (req, res) => {
        console.log(validationResult(req))
        let errors = validationResult(req);
        if(errors.isEmpty()){
            let idLastUser = (parsedUsersDb.length) -1;
            let newUser = {
                id: parsedUsersDb[idLastUser].id + 1,
                name: req.body.nombre,
                lastName: req.body.apellido,
                email: req.body.email,
                password: req.body.password,
                type: 'user',
                image: req.file.filename 
            }
            parsedUsersDb.push(newUser)
        // console.log(finalProduct)
        fs.writeFileSync(usersDbPath, JSON.stringify(parsedUsersDb))
        // let profilePage = '/user/' + newUser.id
        // return res.redirect(profilePage)
        res.send('BIENVENIDO USUARIO NUMERO ' + newUser.id + 'TU NOMBRE COMPLETO ES ' + newUser.name + ' ' + newUser.lastName + 'Y tu foto de perfil es la siguiente: ' + path.join(__dirname, '../public/images/users/' + newUser.image))
        }
        else{
            // console.log(errors.mapped())
            return res.render('register', {errorMessage: errors.mapped(), old: req.body})
        }
    },


    login: (req, res)=>{
        return res.render('login')
    },
    cart: (req, res) => {
        const productos= {
            productos: parsedProductsDb
        }
        return res.render('shoppingCart', productos)
    }
}

module.exports = controller;