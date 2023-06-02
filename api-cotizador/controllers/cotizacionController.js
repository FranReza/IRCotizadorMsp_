const Firebird = require('node-firebird');
const dbconfig = require('../database/config');
const consultas = require('../database/consultas');

const grabarCotizacionMsp = (req, res) => {

    const { CLIENTE, FECHAS, ARTICULOS, METODO_PAGO, VENDEDOR_ID, SUBTOTAL_DOC, IMPUESTOS_TOTAL_DOC, TOTAL_GENERAL } = req.body;

    Firebird.attach(dbconfig, function (err, db) {

        if (err) {
            console.log('error al tratar de consultar a la base de datos microsip...');
        }

        db.transaction(Firebird.ISOLATION_READ_COMMITED, function (err, transaction) {
            if (err) {
                console.log('error al iniciar la transacción');
                return;
            }

            //generamos el folio
            transaction.query(consultas.generadorFolio, function (err, result) {

                if (err) {
                    console.log('error al tratar de consultar el folio');
                    transaction.rollback();
                    res.status(301).send({ mensaje: 'error al tratar de generar el folio : ' + err });
                    return;
                }

                //generamos el folio del documento para iniciar
                const genFolio = result;
                const folioCompleto = `@${genFolio.FOLIO_TEMP.toString().padStart(8, '0')}`;

                const fechaHora = new Date(); // Obtén la fecha y hora actual

                const fecha = fechaHora.toISOString().split('T')[0]; // Obtiene la fecha en formato "YYYY-MM-DD"
                const hora = fechaHora.toTimeString().split(' ')[0]; // Obtiene la hora en formato "HH:MM:SS"

                const fechaHoraDoc = fechaHora.toISOString().replace('T', ' ').split('.')[0];

                const datos_doctos_ve = [
                    -1,
                    'C',
                    'N',
                    1944,
                    folioCompleto,
                    FECHAS.fecha_doc,
                    hora,
                    null,
                    CLIENTE.CLIENTE_ID,
                    CLIENTE.DIR_CLI_ID,
                    CLIENTE.DIR_CLI_ID,
                    null,
                    null,
                    1,
                    0,
                    'P',
                    0,  //DSCTO_PCTJE
                    0, //DSCTO_IMPORTE
                    'P', //STATUS,
                    'S', //APLICADO
                    FECHAS.fecha_vencimiento,
                    null,
                    null,
                    null, //folio recibo de mercancia
                    null,
                    null,
                    SUBTOTAL_DOC, //IMPORTE NETO
                    0,
                    0,
                    IMPUESTOS_TOTAL_DOC,
                    0,
                    0,
                    0,
                    'N', //FORMA EMITIDA
                    'N',
                    'N',
                    'VE',
                    CLIENTE.COND_PAGO_ID,
                    null,
                    0,
                    VENDEDOR_ID,
                    0,  //porcentaje de comision de el vendedor id, nose que podriamos poner aqui...
                    null,
                    0,
                    METODO_PAGO,
                    null,
                    null,
                    'SYSDBA',
                    'N',
                    null,
                    'N',
                    null,
                    null,
                    'N',
                    null,
                    null,
                    'N', //cfdi certificado,
                    null,
                    fechaHoraDoc,
                    'SYSDBA',
                    null,
                    fechaHoraDoc,
                    'S',
                    null,
                    null,
                    null,
                    null,
                ];

                transaction.query(consultas.insertDoctoVe, datos_doctos_ve, function (err, result) {
                    if (err) {
                        console.log('error al tratar de consultar el folio');
                        transaction.rollback();
                        res.status(301).send({ mensaje: 'error al tratar de generar el folio : ' + err });
                        return;
                    }

                    const idInsertado = result?.insertId;
                    console.log('Registro insertado con ID:', idInsertado);

                    transaction.commit(function (err) {
                        if (err) {
                            console.log('Error al realizar el commit:', err);
                            transaction.rollback();
                            res.status(301).send({ mensaje: 'Error al realizar el commit: ' + err });
                            return;
                        }

                        console.log('Transacción confirmada');
                        res.status(200).send({ mensaje: 'Registro insertado con ID: ' + idInsertado });
                        db.detach();
                    });
                });
            });
        });
    });
};

module.exports = { grabarCotizacionMsp }