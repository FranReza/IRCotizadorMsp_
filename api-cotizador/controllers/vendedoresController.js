const Firebird = require('node-firebird');
const dbconfig = require('../database/config');
const consultas = require('../database/consultas');

const getVendedores = (req, res) => {

    Firebird.attach(dbconfig, function (err, db){
        if(err) {
            console.log('error al tratar de consultar a la base de datos microsip...');
        }

        db.query(consultas.listaVendedores, function (err, result) {
            if(err){
                console.log('error al tratar de consultar la lista de vendedores');
            }
            res.status(200).send(result);
            
            db.detach();
        });
    });
};

module.exports = { getVendedores }