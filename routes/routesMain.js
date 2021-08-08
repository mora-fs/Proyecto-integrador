const express = require("express");
const router = express.Router();
const controller = require('../controllers/indexController');

router.get('/', controller.home)
router.get('/login', controller.login)
router.get('/register', controller.register)

module.exports = router;