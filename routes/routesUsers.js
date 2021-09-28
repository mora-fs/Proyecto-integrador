const express= require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const hideFromGuestMiddleware= require('../middlewares/hideFromGuestMiddleware');

router.get('/cart',  controller.cart)
router.post('/cart/:id', controller.addToCart)
router.post('/cart/:id/delete', controller.deleteFromCart)
router.get('/profile', hideFromGuestMiddleware, controller.profile)

module.exports = router;