const fs= require('fs');
const { parse } = require('path');
const path= require('path');

const productsDbPath= path.join(__dirname, '../data/productsDataBase.json');
const parsedProductsDb= JSON.parse(fs.readFileSync(productsDbPath, 'utf-8'));
const usersDbPath = path.join(__dirname, '../data/usersDataBase.json');
const parsedUsersDb= JSON.parse(fs.readFileSync(usersDbPath, 'utf-8'));

const {validationResult} = require('express-validator');

const bcrypt = require('bcryptjs');

const controller = {
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
                password: bcrypt.hashSync(req.body.password, 10),
                type: 'user',
                image: req.file.filename 
            }
            parsedUsersDb.push(newUser)
            fs.writeFileSync(usersDbPath, JSON.stringify(parsedUsersDb))

            // ACA FALTARIA QUE LUEGO DE REGISTRARSE, ANTES DE REDIRECCIONAR AL HOME, GUARDAR EN SESSION
            // EL USUARIO, ASI CUANDO ENTRE AL HOME, AL ESTAR EN SESSION GUARDADO, APARECERÁ LOGUEADO

            return res.render('home', {productos: parsedProductsDb})
        }
        else{
            // console.log(errors.mapped())
            return res.render('register', {errorMessage: errors.mapped(), old: req.body})
        }
    },
    loginForm: (req, res)=>{
        return res.render('login')
    }, 
    login: (req, res) => {
        let userToLogIn= parsedUsersDb.find(user=> user.email==req.body.nombreUsuario);
        req.session.loggedUser= userToLogIn;
        return res.render('profile');
    }
}

module.exports = controller;