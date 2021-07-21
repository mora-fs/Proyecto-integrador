const express = require("express");
const router = express.Router();

const controlador = require('../controladores/controller');

router.get('/carrito', controlador.carrito);
router.get('/producto', controlador.producto);
router.post('/login', controlador.loginValidacion);
router.get('/login', controlador.login);

module.exports = router;