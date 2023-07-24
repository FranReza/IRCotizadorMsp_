const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

function generarPDF(datos) {

  /**
   * SUBTOTAL: SUBTOTAL_DOC,
                    IMPUESTOS: IMPUESTOS_TOTAL_DOC,
                    DESCUENTO: DESCUENTO_EXTRA,
                    TOTAL: TOTAL_GENERAL
   * 
  */

  const { CLIENTE, FECHAS, ARTICULOS, SUBTOTAL, IMPUESTOS, DESCUENTO, TOTAL } = datos;

  const fechaHora = moment().format('YYYY-MM-DD-HH-mm-ss');

  const doc = new PDFDocument();

  // Ruta de la imagen
  const imagePath = path.join(__dirname, '../static/images/vaes logo.jpg');
  // Establecer la posición de la imagen
  const imageX = 10; // Posición en el eje X
  const imageY = 10; // Posición en el eje Y
  // Agregar la imagen al documento PDF
  doc.image(imagePath, imageX, imageY, { width: 150 });

  // Establecer la posición y formato del texto "Cotización"
  doc.font('Helvetica-Bold').fontSize(16).text('Cotización', 450, 25);

  //establecer nombre de la empresa: 
  doc.font('Helvetica-Bold').fontSize(14).text('CARLOS VARA ESCOBARETT', 190, 25);
  doc.font('Helvetica-Bold').fontSize(9).text('VAEC911204AP7', 250, 40);

  doc.font('Helvetica-Bold').fontSize(9).text(`${CLIENTE.NOMBRE_CLIENTE}`, 30, 110);
  doc.font('Helvetica-Bold').fontSize(9).text(`${CLIENTE.RFC_CURP}`, 30, 125);
  doc.font('Helvetica-Bold').fontSize(9).text(`${CLIENTE.EMAIL}`, 30, 140);  

  doc.font('Helvetica-Bold').fontSize(9).text(`Fecha: ${FECHAS.fecha_doc}`, 395, 110);  
  doc.font('Helvetica-Bold').fontSize(9).text(`Fecha vencimiento: ${FECHAS.fecha_vencimiento}`, 395, 125);  

  //AQUI VA EL ENCABEZADO DE LA TABLA
  doc.font('Helvetica-Bold').fontSize(9).text(`NOMBRE`, 30, 180);
  doc.font('Helvetica-Bold').fontSize(9).text(`U.M`, 200, 180);
  doc.font('Helvetica-Bold').fontSize(9).text(`CANT`, 270, 180);
  doc.font('Helvetica-Bold').fontSize(9).text(`ANCHO`, 320, 180);
  doc.font('Helvetica-Bold').fontSize(9).text(`ALTO`, 380, 180);
  doc.font('Helvetica-Bold').fontSize(9).text(`PRECIO`, 440, 180);
  doc.font('Helvetica-Bold').fontSize(9).text(`TOTAL`, 490, 180);

  //agregamos una linea aqui 
  doc.moveTo(30, 190).lineTo(550, 190).stroke();

  //iteramos sobre los articulos
  //coordenadas para situar a los articulos en el pdf
  let x = 30 //coordenada x inicial
  let y = 200 //coordenada y inicial

  ARTICULOS.forEach((articulo) => {

    // Recortar el nombre si excede cierto número de caracteres
  const nombreArticulo = articulo.NOMBRE_ARTICULO.length > 20 ? articulo.NOMBRE_ARTICULO.substring(0, 27) + '...' : articulo.NOMBRE_ARTICULO;

    doc.font('Helvetica').fontSize(8).text(`${nombreArticulo}`, x, y);
    doc.font('Helvetica').fontSize(8).text(`${articulo.UNIDAD_VENTA}`, x + 170, y);
    doc.font('Helvetica').fontSize(8).text(`${articulo.CANTIDAD}`, x + 240, y);
    doc.font('Helvetica').fontSize(8).text(`${articulo.ANCHO}`, x + 290, y);
    doc.font('Helvetica').fontSize(8).text(`${articulo.ALTO}`, x + 350, y);
    doc.font('Helvetica').fontSize(8).text(`$${articulo.PRECIO}`, x + 410, y);
    doc.font('Helvetica').fontSize(8).text(`$${articulo.TOTAL}`, x + 460, y);

    y+=15;
  });

  y+=70;
  doc.font('Helvetica-Bold').fontSize(9).text(`SUBTOTAL: $${SUBTOTAL}`, 440, y);
  doc.font('Helvetica-Bold').fontSize(9).text(`IMPUESTOS: $${IMPUESTOS}`, 440, y+15);
  doc.font('Helvetica-Bold').fontSize(9).text(`DESCUENTO: $${DESCUENTO}`, 440, y+30);
  doc.font('Helvetica-Bold').fontSize(9).text(`TOTAL: $${TOTAL}`, 440, y+45);


  // Concatenar el nombre del cliente con la fecha y hora
  const nombreArchivo = `${CLIENTE.NOMBRE_CLIENTE}-${fechaHora}.pdf`;

  // Guardar el PDF en el servidor
  const filePath = path.join(__dirname, `../files/pdfs/cotizacion.pdf`);

  // Verificar si la carpeta pdfs existe, si no, crearla
  const pdfsFolderPath = path.dirname(filePath);
  if (!fs.existsSync(pdfsFolderPath)) {
    fs.mkdirSync(pdfsFolderPath, { recursive: true });
  }

  doc.pipe(fs.createWriteStream(filePath));
  doc.end();

  return filePath;
}

module.exports = generarPDF;
