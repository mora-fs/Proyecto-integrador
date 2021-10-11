const express= require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const hideFromGuestMiddleware= require('../middlewares/hideFromGuestMiddleware');

router.get('/cart', hideFromGuestMiddleware,  controller.cart)
router.post('/cart/:id', hideFromGuestMiddleware, controller.addToCart)
router.post('/cart/:id/delete',  controller.deleteFromCart)
router.get('/profile', hideFromGuestMiddleware, controller.profile)
router.post('/logout', controller.logOut)

module.exports = router;