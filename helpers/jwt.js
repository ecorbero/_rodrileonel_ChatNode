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

const verifyJWT = (token = '') =>{
    try {
        //verifico si soy capaz de obtener el token, sino se dispara el catch
        const { uid } = jwt.verify(token,process.env.JWTKEY);
        return [true,uid];
    } catch (error) {
        return [false,null];
    }
};

module.exports = {
    generateToken,
    verifyJWT
}