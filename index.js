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

//path publico
const public = path.resolve(__dirname,'public');
app.use(express.static(public));

//Rutas
app.use('/api/login', require('./routes/authRoute'));
app.use('/api/users', require('./routes/usersRoute'));
app.use('/api/messages', require('./routes/messagesRoute'));
app.use('/api/groups', require('./routes/groupRoute'));

// For testing with heroku server
app.route("/check").get((req,res) =>{
 return res.json("Your App is Working");
})

//Node server (socket)
const server = require('http').createServer(app);

//app.listen(process.env.PORT,(err)=>{
server.listen(process.env.PORT,(err)=>{
    if(err) throw new Error(err);
    console.log('Server running on Port: ',process.env.PORT);
});

//const io = require('socket.io')(server);
module.exports.io = require('socket.io')(server, {
    cors: {
      origin: '*',
      //methods: ["GET", "POST"],
      //allowedHeaders: ["x-token","room"],
      //credentials: true
    }
  }
);

require('./sockets/socket');