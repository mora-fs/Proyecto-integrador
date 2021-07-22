const express = require("express");
const router = express.Router();

const controlador = require('../controladores/productController');

router.get('/', controlador.productos);
router.get('/:id', controlador.detalle);
router.get('/:id/editar', controlador.editar);
router.get('/crear', controlador.crear);
router.post('/', controlador.guardarProd);
router.delete('/:id', controlador.delete);

module.exports = router;