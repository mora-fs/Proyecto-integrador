const express = require("express");
const router = express.Router();
const controller = require('../controllers/indexController');

router.get('/', controller.home)
router.get('/login', controller.login)
// router.post('/login', controller.loginValidacion);
router.get('/register', controller.register)
router.get('/cart', controller.cart)

module.exports = router;