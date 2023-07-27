const Firebird = require('node-firebird');
const dbconfig = require('../database/config');
const consultas = require('../database/consultas');

const buscarCliente = (req, res) => {
    const nombre = req.query.query;
    if (nombre !== '') {
        Firebird.attach(dbconfig, function (err, db) {

            if (err) {
                console.log('error al tratar de consultar a la base de datos microsip...' + err);
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

const buscarMoneda = (req, res) => {
    Firebird.attach(dbconfig, function (err, db) {
        if (err) {
            console.log('error al tratar de consultar a la base de datos microsip...');
        }

        db.query(consultas.buscarMonedas, function (err, result) {
            if (err) {
                console.log('error al tratar de consultar la lista de vendedores');
            }
            res.status(200).send(result);

            db.detach();
        });
    });
};

const Condicion_pago = (req, res) => {
    Firebird.attach(dbconfig, function (err, db) {
        if (err) {
            console.log('error al tratar de consultar a la base de datos microsip...');
        }

        db.query(consultas.buscarCondicionPago, function (err, result) {
            if (err) {
                console.log('error al tratar de consultar la lista de vendedores');
            }
            res.status(200).send(result);

            db.detach();
        });
    });
};

const grabarCliente = (req, res) => {
    // Aquí obtienes los datos del cliente y el archivo adjunto
    const nombre = req.body.nombre;
    const telefono = req.body.telefono;
    const email = req.body.email;
    const condicionPagoSeleccionado = parseInt(req.body.condicionPagoSeleccionado);
    const rfc = req.body.rfc;
    const monedaSeleccionado = parseInt(req.body.monedaSeleccionado);
    const vendedorSeleccionado = parseInt(req.body.vendedorSeleccionado);


    Firebird.attach(dbconfig, function (err, db) {
        if (err) {
            console.log('Error al tratar de conectar a la base de datos microsip...');
            return;
        }

        db.transaction(Firebird.ISOLATION_READ_COMMITTED, function (err, transaction) {
            if (err) {
                console.log('Error al iniciar la transacción');
                db.detach();
                return;
            }

            transaction.query(consultas.insertarCliente, [-1, nombre, monedaSeleccionado, condicionPagoSeleccionado, vendedorSeleccionado], function (err, result) {
                if (err) {
                    console.log('Error al tratar de insertar en la primera tabla');
                    transaction.rollback();
                    res.status(301).send({ mensaje: 'Error al tratar de insertar en la primera tabla: ' + err });
                    db.detach();
                    return;
                }


                const clienteID = result.CLIENTE_ID;
                console.log('exito!: ' + clienteID);

                transaction.query(consultas.datosCliente, [-1, clienteID, 'Dirección principal', telefono, email, rfc], function (err, result) {
                    if (err) {
                        console.log('Error al tratar de insertar en la segunda tabla' + err);
                        transaction.rollback();
                        res.status(301).send({ mensaje: 'Error al tratar de insertar en la primera tabla: ' + err });
                        db.detach();
                        return;
                    }

                    console.log('Cliente insertado correctamente');
                    // Realizar el commit para guardar los cambios en la base de datos
                    transaction.commit(function (err) {
                        if (err) {
                            console.log('Error al hacer commit');
                            transaction.rollback();
                            db.detach();
                            return res.status(500).json({ mensaje: 'Error al hacer commit' });
                        }

                        console.log('Cambios guardados en la base de datos');
                        db.detach();
                        res.status(200).json({ mensaje: 'Cliente guardado correctamente' });
                    });
                });
            });
        });
    });
};

module.exports = {
    buscarCliente,
    buscarMoneda,
    Condicion_pago,
    grabarCliente
}