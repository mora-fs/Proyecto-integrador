const express = require("express");
const router = express.Router();

const controlador = require('../controladores/productController');

router.get('/', controlador.productos);
router.get('/detalle', controlador.detalle);
router.get('/crear', controlador.crear);
router.post('/crear', controlador.guardarProd);

module.exports = router;