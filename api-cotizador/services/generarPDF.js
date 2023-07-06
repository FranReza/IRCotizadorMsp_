const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generarPDF(datos) {
  const { CLIENTE, FECHAS, ARTICULOS } = datos;

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

  doc.font('Helvetica-Bold').fontSize(9).text(`${CLIENTE.NOMBRE}`, 250, 40);

  


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
