//configuracion de express:
const express = require('express');
const router = express.Router();

//invocacion de los controladores: 
const clientesController = require('../controllers/clientesController.js');
const articulosController = require('../controllers/ArticulosController.js');
const vendedoresController = require('../controllers/vendedoresController.js');
const cotizacionController = require('../controllers/cotizacionController.js');

router.get('/', (req, res) => {
    res.send('Servidor de cotizaciones microsip -- ir soluciones...');
});

router.get('/buscar-cliente', clientesController.buscarCliente);
router.get('/buscar-articulo', articulosController.buscarArticulo);
router.get('/precio-articulo', articulosController.getPrecioArticuloCliente);
router.get('/obtener-vendedores', vendedoresController.getVendedores);
router.post('/grabar-cotizacion', cotizacionController.grabarCotizacionMsp);

module.exports = router;