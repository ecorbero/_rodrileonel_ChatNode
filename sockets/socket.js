const { userConnected, userDisconnected, saveMessage } = require('../controllers/socketController');
const { verifyJWT } = require('../helpers/jwt');
const{io} = require('../index');

// room to leave id
var lastRoom;

//Mensajes de sockets
io.on('connection', client => {
    console.log(`Client connected!`);

    const roomName = client.handshake.headers['room'];
    const [ok, uid] = verifyJWT(client.handshake.headers['x-token']);

    console.log(`Room Name = ${roomName}`);
    console.log(`uid = ${uid}`);

    //verificar auth
    if(!ok) {
        console.log((`Wrong token(${client.handshake.headers['x-token']}) => disconnecting `));
        return client.disconnect();
    } 

    // Update Data Base User online
    userConnected(uid);

    // Join a room
    // Default is the userId 
    // example: 5fc7e4c54f9c5166f69d816d
    if (roomName == "noroom") {
        client.join(uid);
        console.log(`Client ha entrat a room = ${uid}`);
    } else {
        client.join(roomName);
        console.log(`Clinet ha entrat a room = ${uid}`);
    }

    // Listen a Message
    client.on('message',async payload =>{
        
        if (payload.changeroom){ // Mesage Change Room
            console.log(payload);
            //console.log(lastRoom);
            if (payload.leaveRoom == "na" && lastRoom != null) {
                // Disconnect from the previous Joined Room, if this is NOT a Group Chat
                client.leave(lastRoom);
            } else {
                client.leave(payload.leaveRoom);
            }
            
            lastRoom = payload.joinRoom;
            client.join(lastRoom);
        } else {        // Chat Message
            //console.log("sddfw333");
            console.log(payload);
            //console.log(uid);

            await saveMessage(payload); 
            io.to(payload.to).emit('message',payload);
        }
    })

    client.on('disconnect', () => {
        if (roomName == "noroom") {
            console.log(`Disconnecting UID = ${uid}`)
            userDisconnected(uid);
        }
    });



    // client.on('message', (payload) => { 
    //     console.log('Mensaje recibido',payload);
    //     //ahora voy a emitir una respuesta
    //     io.emit('supermessage',{admin:payload['name']});
    // });

});