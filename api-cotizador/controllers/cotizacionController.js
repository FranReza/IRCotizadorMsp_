const Firebird = require('node-firebird');
const dbconfig = require('../database/config');
const consultas = require('../database/consultas');
const generarPDF = require('../services/generarPDF');
const enviarCorreo = require('../services/enviarCorreo');

const grabarCotizacionMsp = (req, res) => {
  const { CLIENTE, FECHAS, ARTICULOS, METODO_PAGO, VENDEDOR_ID, SUBTOTAL_DOC, IMPUESTOS_TOTAL_DOC, DESCUENTO_EXTRA, TOTAL_GENERAL } = req.body;

  Firebird.attach(dbconfig, function (err, db) {
    if (err) {
      console.log('Error al tratar de conectar a la base de datos microsip...');
      return;
    }

    db.transaction(Firebird.ISOLATION_READ_COMMITED, function (err, transaction) {
      if (err) {
        console.log('Error al iniciar la transacción');
        db.detach();
        return;
      }

      transaction.query(consultas.generadorFolio, function (err, result) {
        if (err) {
          console.log('Error al tratar de consultar el folio');
          transaction.rollback();
          res.status(301).send({ mensaje: 'Error al tratar de generar el folio: ' + err });
          db.detach();
          return;
        }

        const genFolio = result;
        const folioCompleto = `@${genFolio.FOLIO_TEMP.toString().padStart(8, '0')}`;

        const fechaHora = new Date();
        const hora = fechaHora.toTimeString().split(' ')[0];
        const fechaHoraDoc = fechaHora.toISOString().replace('T', ' ').split('.')[0];
        const calcular_pctje = (DESCUENTO_EXTRA / TOTAL_GENERAL) * 100;

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
          1, //MONEDA_ID
          0, //TIPO DE CAMBIO
          'I', //TIPO DE DESCUENTO DE AHORA EN ADELANTE SERA PORCENTAJE
          calcular_pctje, //DSCTO_PCTJE 
          DESCUENTO_EXTRA,
          'P',
          'S',
          FECHAS.fecha_vencimiento,
          null,
          null,
          null,
          null,
          null,
          SUBTOTAL_DOC ,
          0,
          0,
          IMPUESTOS_TOTAL_DOC,
          0,
          0,
          0,
          'N',
          'N',
          'N',
          'VE',
          CLIENTE.COND_PAGO_ID,
          null,
          0,
          VENDEDOR_ID,
          0,
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
          'N',
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
            console.log('Error al tratar de insertar en la primera tabla');
            transaction.rollback();
            res.status(301).send({ mensaje: 'Error al tratar de insertar en la primera tabla: ' + err });
            db.detach();
            return;
          }

          const idDoctosVe = result.DOCTO_VE_ID;
          console.log(idDoctosVe);
          let posicion = 1;
          let descuentoDividido = 0;


          const insertions = ARTICULOS.map((articulo) => {

            if(ARTICULOS.length > 1) {
              descuentoDividido = parseFloat(DESCUENTO_EXTRA / ARTICULOS.length).toFixed(3);
            } else {
              descuentoDividido = DESCUENTO_EXTRA;
            }


            if (articulo.UNIDAD_VENTA === 'Metro cuadrado') {
              const mcuadrado = articulo.MCUADRADO;
              const mcuadradoFloat = +parseFloat(mcuadrado);
              const calc_dscto = +parseFloat((((articulo.PRECIO * mcuadradoFloat) * articulo.DESCTO) / 100)).toFixed(2);

              const datos_doctos_ve_det_mc = [
                -1,
                idDoctosVe,
                articulo.CLAVE_ARTICULO,
                articulo.ARTICULO_ID,
                mcuadradoFloat, //UNIDADES
                0,
                0,
                0,
                articulo.PRECIO,
                articulo.DESCTO,
                calc_dscto,
                articulo.DESCTO,
                descuentoDividido,
                0,
                0,
                parseFloat(articulo.TOTAL),
                0,
                'N',
                articulo.NOTAS !== '' ? articulo.NOTAS : null,
                posicion,
              ];

              console.log('Se inserta en la tabla con mcuadrado');
              console.log(datos_doctos_ve_det_mc);

              return { insert: datos_doctos_ve_det_mc };
            } else {
              const calc_dscto = +parseFloat((((articulo.PRECIO * articulo.CANTIDAD) * articulo.DESCTO) / 100)).toFixed(2);

              const datos_doctos_ve_det_pz = [
                -1,
                idDoctosVe,
                articulo.CLAVE_ARTICULO,
                articulo.ARTICULO_ID,
                parseInt(articulo.CANTIDAD),
                0,
                0,
                0,
                articulo.PRECIO,
                articulo.DESCTO,
                calc_dscto,
                articulo.DESCTO,
                descuentoDividido,
                0,
                0,
                parseFloat(articulo.TOTAL),
                0,
                'N',
                articulo.NOTAS !== '' ? articulo.NOTAS : null,
                posicion,
              ];

              console.log('Se inserta en la tabla con cantidad');
              console.log(datos_doctos_ve_det_pz);

              return { insert: datos_doctos_ve_det_pz };
            }
          });

          let insertedCount = 0;

          insertions.forEach((insert) => {
            transaction.query(consultas.insertDoctoVeDet, insert.insert, function (err, result) {
              if (err) {
                console.log('Error al insertar en la segunda tabla');
                transaction.rollback();
                res.status(301).send({ mensaje: 'Error al tratar de insertar en la segunda tabla: ' + err });
                db.detach();
                return;
              }

              insertedCount++;

              if (insertedCount === insertions.length) {
                transaction.commit(function (err) {
                  if (err) {
                    console.log('Error al confirmar la transacción');
                    transaction.rollback();
                    res.status(301).send({ mensaje: 'Error al confirmar la transacción: ' + err });
                    db.detach();
                    return;
                  }

                  console.log('Datos insertados correctamente en ambas tablas.');

                  // Generar el PDF
                  const datosPDF = {
                    CLIENTE: CLIENTE,
                    FECHAS: FECHAS,
                    ARTICULOS: ARTICULOS,
                  };
                  const filePath = generarPDF(datosPDF);

                  //enviamos por correo
                  /*enviarCorreoPDF(filePath, 'fran.reza@hotmail.com', function (error) {
                    if (error) {
                      console.log('Error al enviar el correo electrónico:', error);
                      res.status(500).send({ mensaje: 'Error al enviar el correo electrónico' });
                      db.detach();
                      return;
                    }
                  
                    
                  });*/

                  // Enviar el PDF como respuesta al cliente
                  res.sendFile(filePath);
                  db.detach();
                });
              }
            });
          });
        });
      });
    });
  });
};

module.exports = { grabarCotizacionMsp };
