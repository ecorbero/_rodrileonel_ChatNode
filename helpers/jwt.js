const jwt = require('jsonwebtoken');

const generateToken = (uid) => {

    return new Promise((resolve,reject)=>{
        //el jwt tiene tres partes
        //1 un header
        //2 un payload
        const payload = { uid };

        //3 y un secret
        jwt.sign(payload, process.env.JWTKEY,{
            expiresIn:'12h',
        }, (error, token) => {
            if(error){
                //no se pudo crear token
                reject('no se pudo generar el jwt');
            }else{
                //hay token
                resolve(token);
            }
        })
    });
};

module.exports = {
    generateToken
}