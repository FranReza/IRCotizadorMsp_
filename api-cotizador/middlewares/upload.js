const multer = require('multer');
const path = require('path');

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Definir la ruta de destino para guardar el archivo
    cb(null, path.join(__dirname, '..', 'files', 'constancias'));
  },
  filename: (req, file, cb) => {
    // Renombrar el archivo con su nombre original
    cb(null, file.originalname);
  },
});

// Crear el middleware de multer
const upload = multer({ storage });

module.exports = upload;
