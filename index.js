const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

console.log(process.env.PORT)

//* crear el servidor de express
const app = express();

//* Base de datos
dbConnection();

//* CORS
app.use(cors());

//* Directorio Public
app.use(express.static('public'));

//* Lectura y parseo del body
app.use(express.json());

//* Rutas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/event', require('./routes/event'))


//* Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});