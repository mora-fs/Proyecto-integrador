const express= require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const hideFromGuestMiddleware= require('../middlewares/hideFromGuestMiddleware');

router.get('/cart', /*hideFromGuestMiddleware,*/ controller.cart)
router.post('/cart/:id', /*hideFromGuestMiddleware,*/ controller.addToCart)
router.get('/profile', hideFromGuestMiddleware, controller.profile)

module.exports = router;