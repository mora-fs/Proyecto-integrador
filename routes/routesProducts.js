const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");

router.get('/', controller.productsList);
router.get('/crear', controller.createForm);
router.post('/crear', controller.createProduct);
router.get('/:id', controller.detail);
router.get('/:id/editar', controller.editForm);
router.delete('/:id', controller.delete);

module.exports = router;