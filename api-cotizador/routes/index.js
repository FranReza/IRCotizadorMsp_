const express = require('express');
const router = express.Router();

const clientesController = require('../controllers/clientesController.js');
const articulosController = require('../controllers/ArticulosController.js');

router.get('/', (req, res) => {
    res.send('Servidor de cotizaciones microsip -- ir soluciones...');
});

router.get('/buscar-cliente', clientesController.buscarCliente);
router.get('/buscar-articulo', articulosController.buscarArticulo);


module.exports = router;