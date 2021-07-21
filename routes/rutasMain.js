const express = require("express");
const router = express.Router();

const controlador = require('../controladores/userController');

router.get('/carrito', controlador.carrito);
router.get('/login', controlador.login);

module.exports = router;