const Firebird = require('node-firebird');
const dbconfig = require('../database/config');
const consultas = require('../database/consultas');


/*Este endpoint genera la busqueda del articulo por la web*/
const buscarArticulo = (req, res) => {
    
    const nombre_articulo = req.query.query;

    Firebird.attach(dbconfig, function (err, db) {
        if(err){
            console.log('error al tratar de consultar a la base de datos microsip...');
        }
        db.query(consultas.buscarArticuloPorNombre, [`${nombre_articulo}`], function(err, result){
            if(err){
                console.log('error al tratar de consultar el articulo');
            }
            res.status(200).send(result);

            db.detach();
        });
    });

};

module.exports = { buscarArticulo };