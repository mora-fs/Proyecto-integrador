const express= require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.get('/cart', /*HideToGuestMiddleware,*/ controller.cart)
router.get('/profile', /*HideToGuestMiddleware,*/ controller.profile)

module.exports = router;