const express = require('express');
const router = express.Router();

const clientesController = require('../controllers/clientesController.js')

router.get('/', (req, res) => {
    res.send('Servidor de cotizaciones microsip -- ir soluciones...');
});

router.get('/buscar-cliente', clientesController.buscarCliente);

module.exports = router;