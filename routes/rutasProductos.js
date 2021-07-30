const express = require("express");
const router = express.Router();

const controlador = require('../controladores/productController');

router.get('/', controlador.productos);

router.get('/detalle', controlador.detalle);

router.get('/create', controlador.createForm);
router.post('/create', controlador.createProduct);

router.get('/:id', controlador.detalle);
router.get('/:id/edit', controlador.editForm);
router.delete('/:id', controlador.delete);

module.exports = router;