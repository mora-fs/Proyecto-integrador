const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");
const path= require('path');
const onlyEmployeeMiddleware= require('../middlewares/onlyEmployeeMiddleware');

// LOGICA DE MULTER 
const multer= require('multer');
const storage= multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../public/images/productos'))
    },
    filename: function(req, file, cb){
        cb(null, 'product-' + Date.now() + path.extname(file.originalname))
    }
});
const uploadFile= multer({storage});

// LOGICA DE VALIDACION EXPRESS-VALIDATOR
const {body} = require('express-validator');

const validations = [
    body('name').notEmpty().withMessage('El producto debe tener un nombre!'),
    body('marca').notEmpty().withMessage('Debes incluir la marca de tu producto'),
    body('price').notEmpty().withMessage('Debes añadirle un precio a tu producto').bail()
    .isInt().withMessage('Debe ser un numero simbolos ni caracteres'),
    body('discount').notEmpty().withMessage('Debes aclarar el descuento en caso de no tenerlo, poner 0 (cero)').bail()
    .isInt().withMessage('Debe ser un numero sin simbolos ni caracteres').bail()
    .custom((value, {req}) => {
        let descuento = req.body.discount;
        if(descuento < 0){
            throw new Error('El descuento no puede ser un numero negativo')
        }
        return true
    }),
    body('cantidad').notEmpty().withMessage('Debes indicar la cantidad disponible de unidades de este producto').bail()
    .custom((value, {req}) => {
        let cantidad = req.body.cantidad;
        if(cantidad <= 0){
            throw new Error('Debe ser al menos 1')
        }
        return true
    }),
    body('category').custom((value, {req}) => {
        if(req.body.category == ""){
            throw new Error('Debes seleccionar el rubro del producto')
        }
        return true
    }),
    body('description').notEmpty().withMessage('EL producto debe tener una descripcion').bail()
    .isLength({min: 20}).withMessage('Debe tener al menos 20 caracteres'),
    body('imgNewProduct').custom((value, {req}) => {
        if(!req.file){
            throw new Error('Debes incluir una imagen de producto')
        }
        return true
    }).bail()
    .custom((value, {req}) => {
        let acceptedExtensions = ['.jpg', '.png'];
        if(!acceptedExtensions.includes(path.extname(req.file.originalname))){
            throw new Error('Extension no valida')
        }
        return true;
    })
]
router.get('/', /*onlyEmployeeMiddleware,*/ controller.productsList);

router.get('/crear', onlyEmployeeMiddleware,  controller.createForm);
router.post('/crear', uploadFile.single('imgNewProduct') ,onlyEmployeeMiddleware, validations, controller.createProduct);



router.get('/search', controller.searchProduct)

router.get('/:id',  controller.detail);

router.get('/:id/editar', onlyEmployeeMiddleware, controller.editForm);
router.put('/:id/editar', onlyEmployeeMiddleware, controller.edit)

router.delete('/:id', onlyEmployeeMiddleware, controller.delete);

// router.get('/:queryBusqueda', controller.searchProduct);
// router.get('/:categoria', controller.categories);

module.exports = router;