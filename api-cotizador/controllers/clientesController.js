const Firebird = require('node-firebird');
const dbconfig = require('../database/config');
const consultas = require('../database/consultas')

const buscarCliente = (req, res) => {
    const  nombre  = req.query.nombre;
    Firebird.attach(dbconfig, function (err, db) {

        if(err){
            console.log('error al tratar de consultar a la base de datos microsip...');
        }

        db.query(consultas.buscarClientesPorNombre, [`%${nombre}%`], function(err, result){

            if(err){
                console.log('error al tratar de consultar el cliente');
            }

            res.status(200).json({ result });

            db.detach();
        });
    });
};

module.exports = { buscarCliente }