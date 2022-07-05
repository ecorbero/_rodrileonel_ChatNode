const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

//Configuracion DB
require('./database/config').dbConnection();

//App de Express
const app = express();

//Lectura y parseo de body
app.use(cors());
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
app.use('/api/users', require('./routes/usersRoute'));
app.use('/api/messages', require('./routes/messagesRoute'));
app.use('/api/groups', require('./routes/groupRoute'));

//app.listen(process.env.PORT,(err)=>{
server.listen(process.env.PORT,(err)=>{
    if(err) throw new Error(err);
    console.log('Server running on Port: ',process.env.PORT);
});