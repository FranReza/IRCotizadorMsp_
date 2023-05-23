const Firebird = require('node-firebird');
const dbconfig = require('../database/config');
const consultas = require('../database/consultas');

const buscarArticulo = (req, res) => {
    
    const nombre_articulo = req.query.query;
    console.log(nombre_articulo);

    Firebird.attach(dbconfig, function (err, db) {

        if(err){
            console.log('error al tratar de consultar a la base de datos microsip...');
        }

        db.query(consultas.buscarArticuloPorNombre, function(err, result){

            if(err){
                console.log('error al tratar de consultar el articulo');
            }

            res.status(200).send(result);

            db.detach();
        });
    });

};

module.exports = { buscarArticulo };