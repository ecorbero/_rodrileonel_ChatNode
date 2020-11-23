const{io} = require('../index');

//Mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
    });
    client.on('message', (payload) => { 
        console.log('Mensaje recibido',payload);
        //ahora voy a emitir una respuesta
        io.emit('supermessage',{admin:payload['name']});
    });
});