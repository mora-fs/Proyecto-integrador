const express= require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const hideFromGuestMiddleware= require('../middlewares/hideFromGuestMiddleware');

router.get('/p', hideFromGuestMiddleware, controller.profile)
router.get('/cart', hideFromGuestMiddleware, controller.cart)

module.exports = router;