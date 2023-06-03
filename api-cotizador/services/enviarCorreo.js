const nodemailer = require('nodemailer');

async function enviarCorreoPDF(pdfFilePath, destinatario) {
  // Configurar el transporte de correo electrónico
  const transporter = nodemailer.createTransport({
    // Configura aquí los detalles de tu servidor de correo saliente (SMTP)
    host: 'smtp.1and1.mx',
    port: 465,
    secure: true,
    auth: {
      user: 'desarrollo@irsoluciones.com.mx',
      pass: '*Fr@n2022*',
    },
  });

  // Configurar el contenido del correo electrónico
  const mensaje = {
    from: 'desarrollo@irsoluciones.com.mx',
    to: destinatario,
    subject: 'Adjunto: Cotización en formato PDF',
    text: 'Adjunto encontrarás la cotización en formato PDF.',
    attachments: [
      {
        filename: 'cotizacion.pdf',
        path: pdfFilePath,
      },
    ],
  };

  try {
    // Enviar el correo electrónico
    const info = await transporter.sendMail(mensaje);
    console.log('Correo electrónico enviado:', info.messageId);
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
  }
}

module.exports = enviarCorreoPDF;
