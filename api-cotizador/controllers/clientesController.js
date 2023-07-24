const Firebird = require('node-firebird');
const dbconfig = require('../database/config');
const consultas = require('../database/consultas');

const buscarCliente = (req, res) => {
    const nombre = req.query.query;
    if (nombre !== '') {
        Firebird.attach(dbconfig, function (err, db) {

            if (err) { 
                console.log('error al tratar de consultar a la base de datos microsip...'+ err);
            }

            db.query(consultas.buscarClientesPorNombre, [`%${nombre}%`], function (err, result) {

                if (err) {
                    console.log('error al tratar de consultar el cliente');
                }

                res.status(200).send(result);

                db.detach(); 
            });
        });
    }
};

module.exports = { buscarCliente }