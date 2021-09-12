const express = require("express");
const router = express.Router();
const controller = require('../controllers/indexController');

router.get('/', controller.home)
router.get('/register', controller.register)
router.post('/register', controller.registerSave)
router.get('/login', controller.login)
router.post('/login', controller.loginSave)

module.exports = router;