const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();

app.use(cors({
    origin: 'http://172.16.1.108:3000',
    methods: ['GET', 'POST'],
    exposedHeaders: '*',
    credentials: true
  }));

app.use(express.json());
app.use(express.urlencoded({ extended:true }))

app.use('/', routes);

app.listen(5000, () => {
    console.log('Servidor de cotizaciones microsip corriendo en el puerto 5000');
}); 