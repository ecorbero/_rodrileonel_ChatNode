const { userConnected, userDisconnected, saveMessage } = require('../controllers/socketController');
const { verifyJWT } = require('../helpers/jwt');
const{io} = require('../index');

//Mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    const [ok, uid] = verifyJWT(client.handshake.headers['x-token']);

    //verificar auth
    if(!ok) return client.disconnect();

    //actualizar campo online de usuario en la base de datos
    userConnected(uid);

    //Ingresar al usuario a una sala
    // las salas por defecto son la sala global y la del client.id,
    // pero mandaremos al usuario a una sala con  el uid del usuario, 
    // ejemplo: 5fc7e4c54f9c5166f69d816d
    client.join(uid);

    //escuchar el mensaje
    client.on('message',async payload =>{
        console.log(payload);
        await saveMessage(payload); 
        io.to(payload.to).emit('message',payload);
    })

    client.on('disconnect', () => { 
        userDisconnected(uid);
    });

    // client.on('message', (payload) => { 
    //     console.log('Mensaje recibido',payload);
    //     //ahora voy a emitir una respuesta
    //     io.emit('supermessage',{admin:payload['name']});
    // });

});