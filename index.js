const express = require('express');
const path = require('path');
require('dotenv').config();

//Configuracion DB
require('./database/config').dbConnection();

//App de Express
const app = express();

//Lectura y parseo de body
app.use(express.json());

//Node server (socket)
const server = require('http').createServer(app);
//const io = require('socket.io')(server);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

//path publico
const public = path.resolve(__dirname,'public');
app.use(express.static(public));

//Rutas
app.use('/api/login', require('./routes/authRoute'));

//app.listen(process.env.PORT,(err)=>{
server.listen(process.env.PORT,(err)=>{
    if(err) throw new Error(err);
    console.log('Servidor corriendo en puerto',process.env.PORT);
});