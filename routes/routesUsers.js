const express= require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.get('/cart', controller.cart)
router.get('/profile', controller.profile)

module.exports = router;