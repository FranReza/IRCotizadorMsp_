const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generarPDF(datos) {
  const { CLIENTE, FECHAS, ARTICULOS } = datos;

  const doc = new PDFDocument();

  // Establecer el contenido del PDF
  doc.fontSize(12).text(`CARLOS VARA ESCOBARETT -- COTIZACION MICROSIP`);
  doc.fontSize(12).text(`Cliente: ${CLIENTE.NOMBRE_CLIENTE}`);
  //doc.fontSize(12).text(`Fecha: ${FECHAS}`);
  // Agregar más contenido según tus necesidades

  // Guardar el PDF en el servidor
  const filePath = path.join(__dirname, '../files/pdfs/cotizacion.pdf');

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
