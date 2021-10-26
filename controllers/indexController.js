const fs= require('fs');
const { parse } = require('path');
const path= require('path');

const productsDbPath= path.join(__dirname, '../data(JSON)/productsDataBase.json');
const parsedProductsDb= JSON.parse(fs.readFileSync(productsDbPath, 'utf-8'));
const usersDbPath = path.join(__dirname, '../data(JSON)/usersDataBase.json');
const parsedUsersDb= JSON.parse(fs.readFileSync(usersDbPath, 'utf-8'));

const {validationResult} = require('express-validator');

const bcrypt = require('bcryptjs');

const db = require('../database/models')
const Op = db.Sequelize.Op;

const controller = {
    home: (req, res)=>{
        // const productos= {
        //     productos: parsedProductsDb
        // }
        // return res.render('home', productos)

        db.Product.findAll({
            where: {discount: {[Op.gte]: 20}},
            limit: 8
        })
        .then(products => {
            return res.render('home', {products})
        })
    }, 

    registerForm: (req, res)=>{
        return res.render('register')
    }, 
    register: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            db.User.findOne({
                where: {email: req.body.email}
            })
            .then(foundExistingUser => {
                if(!foundExistingUser){
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
                    .catch(error => { res.send(error)})
        
                }
                else{
                    return res.render('register', {existingEmail: 'Este email ya se encuentra en uso', old: req.body})
                }
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

        db.User.findOne({
            where: {email: req.body.username}
        })
        .then(user => {
            let old = req.body
            // console.log(user.password)
            if(user){
                let passwordCheck = bcrypt.compareSync(req.body.password, user.password)
                if(passwordCheck){
                    req.session.loggedUser = user;
                    res.redirect('/cuenta/profile')
                }else{
                    res.render('login', {errorMessage: 'Contraseña incorrecta', old})
                }
            }else{
                res.render('login', {errorMessage: 'Usuario no encontrado', old})
            }
        })
        .catch(error => { res.send(error)})
    }
}

module.exports = controller;