const express = require('express');
require('dotenv').config();

console.log(process.env.PORT)

//* crear el servidor de express
const app = express();

//* Directorio Public
app.use(express.static('public'));

//* Lectura y parseo del body
app.use(express.json());

//* Rutas
app.use('/api/auth', require('./routes/auth'))
//TODO: CRUD: Eventos


//* Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});