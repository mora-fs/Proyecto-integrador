const express = require("express");
const router = express.Router();
const controller = require('../controllers/indexController');
const path= require('path');

const {body} = require('express-validator');

const validations = [
    body('nombre').notEmpty().withMessage('Debes poner tu nombre'),
    body('apellido').notEmpty().withMessage('Debes poner tu apellido'),
    // check('birthDate').notEmpty().withMessage('Debes poner tu fecha de nacimiento'),
    body('email').notEmpty().withMessage('Debes poner tu email').bail()
    .isEmail().withMessage('Email no válido'),
    body('password').notEmpty().withMessage('Debes poner tu contraseña').bail()
    .isLength({min:6}).withMessage('Tu contraseña debe tener al menos 6 caracteres'),
    body('confirmPassword').notEmpty().withMessage('Debes confirmar tu contraseña').bail()
    .custom((value, {req}) => {
        let password = req.body.password;
        let confirmPassword = req.body.confirmPassword
        if(password != confirmPassword){
            throw new Error('Debes escribir la misma contraseña en ambos campos')
        }
        return true
    }),
    body('userImage').custom((value, {req}) => {
        if(!req.file){
            throw new Error('Debes incluir una imagen de perfil')
        }
        return true
    }).bail()
    .custom((value, {req}) => {
        let acceptedExtensions = ['.jpg', '.png'];
        if(!acceptedExtensions.includes(path.extname(req.file.originalname))){
            throw new Error('extension no valida')
        }
        return true;
    })
]

const multer= require('multer');
// const { off } = require("process");
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../public/images/users'))
    },
    filename: function(req, file, cb){

        cb(null, 'user-' + Date.now() + path.extname(file.originalname))
    }
})
const upload= multer({storage});



router.get('/', controller.home)
router.get('/login', /*HideToUserMiddleware,*/ controller.loginForm)
router.post('/login', /*HideToUserMiddleware,*/ controller.login)
router.get('/register', /*HideToUserMiddleware,*/ controller.registerForm);
router.post('/register', /*HideToUserMiddleware,*/ upload.single('userImage'), validations,  controller.register);

module.exports = router;