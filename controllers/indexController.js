const fs= require('fs');
const { parse } = require('path');
const path= require('path');

const productsDbPath= path.join(__dirname, '../data/productsDataBase.json');
const parsedProductsDb= JSON.parse(fs.readFileSync(productsDbPath, 'utf-8'));
const usersDbPath = path.join(__dirname, '../data/usersDataBase.json');
const parsedUsersDb= JSON.parse(fs.readFileSync(usersDbPath, 'utf-8'));

const {validationResult} = require('express-validator');

const bcrypt = require('bcryptjs');

const db = require('../database/models')

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
        let errors = validationResult(req);
        if(errors.isEmpty()){
            let idLastUser = (parsedUsersDb.length) -1;
            let newUser = {
                name: req.body.nombre,
                lastName: req.body.apellido,
                password: bcrypt.hashSync(req.body.password, 10),
                email: req.body.email,
                employee: 'user',
                profileImage: req.file.filename 
            };

            db.User.create(newUser)
            .then(data => {
                req.session.loggedUser = newUser
                res.redirect('/cuenta/profile')
            })

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
        // Esta logica es de un login "provisorio", solo esta para ir probando los ruteos, para el login habria que hacer una verificacion completa 
        // let userToLogIn= parsedUsersDb.find(user=> user.email==req.body.nombreUsuario);
        // req.session.loggedUser= userToLogIn;
        // return res.redirect('/cuenta/profile');

        db.User.findAll({
            where: {email: req.body.username}
        })
        .then(user => {
            console.log(user);
            // console.log(user.password)
            if(user){
                console.log(req.body.password)
                console.log(user[0].password)
                let passwordCheck = bcrypt.compareSync(req.body.password, user[0].password)
                console.log(passwordCheck)
                if(passwordCheck){
                    req.session.loggedUser = user;
                    res.redirect('/cuenta/profile')
                }else{res.send('aaa')}
            }else{
                res.send('error')
            }
        })
    }
}

module.exports = controller;