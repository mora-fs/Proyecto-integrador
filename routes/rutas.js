const express = require("express");
const router = express.Router();

const controller = require('../controladores/controller');

router.get('/carrito', controller.cart);
router.get('/producto', controller.product);
router.post('/login', controller.loginValidacion);
router.get('/login', controller.login);

module.exports = router;