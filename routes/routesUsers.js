const express= require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const hideFromGuestMiddleware= require('../middlewares/hideFromGuestMiddleware');

const multer= require('multer');
// const { off } = require("process");
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../public/images/users'))
    },
    filename: function(req, file, cb){

        cb(null, 'user-' + Date.now() + path.extname(file.originalname))
    }
})
const upload= multer({storage});



router.get('/cart', hideFromGuestMiddleware,  controller.cart)
router.post('/cart/:id', hideFromGuestMiddleware, controller.addToCart)
router.post('/cart/:id/delete',  controller.deleteFromCart)
router.get('/profile', hideFromGuestMiddleware, controller.profile)
router.get('/profile/edit', hideFromGuestMiddleware, controller.editProfileForm)
router.post('/profile/edit',upload.single('userImage'), controller.editProfile)
router.post('/logout', controller.logOut)

module.exports = router;