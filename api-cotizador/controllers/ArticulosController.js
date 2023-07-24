const Firebird = require('node-firebird');
const dbconfig = require('../database/config');
const consultas = require('../database/consultas');


/*Este endpoint genera la busqueda del articulo por la web*/
const buscarArticulo = (req, res) => {
    
    const nombre_articulo = decodeURIComponent(req.query.query);

    Firebird.attach(dbconfig, function (err, db) {
        if(err){
            console.log('error al tratar de consultar a la base de datos microsip...');
        }
        db.query(consultas.buscarArticuloPorNombre, [`${nombre_articulo}`], function(err, result){
            if(err){
                console.log('error al tratar de consultar el articulo');
                res.status(500).json({error: 'No se pudo consultar el articulo especificado...'})
            }
            res.status(200).send(result);

            db.detach();
        });
    });

};

const getPrecioArticuloCliente = (req, res) => {

    const articuloID = req.query.articuloID;
    const clienteID = req.query.clienteID;

    Firebird.attach(dbconfig, function (err, db) {
        if(err){
            console.log('error al tratar de consultar a la base de datos microsip...');
        }
        db.query(consultas.buscarPrecioArticuloCliente, [clienteID, articuloID], function(err, result){
            if(err){
                console.log('error al tratar de consultar el precio del articulo');
            }
            
            const calc_iva = (parseFloat(result.PRECIO_UNITARIO) * 0.16).toFixed(2);
            const calc_total = (parseFloat(result.PRECIO_UNITARIO) + parseFloat(calc_iva)).toFixed(2);

            
            const detalleArticulo = {
                PRECIO_UNITARIO:  result.PRECIO_UNITARIO,
                IVA: parseFloat(calc_iva),
                TOTAL: parseFloat(calc_total),
            }

            res.status(200).send(detalleArticulo);

            db.detach();
        });
    });
};

module.exports = { 
    buscarArticulo,
    getPrecioArticuloCliente,
};