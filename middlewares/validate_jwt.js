const jwt = require('jsonwebtoken');

const validateJWT = (req,res,next) => {

    //leer token
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            ok:false,
            msj:'la peticion no tiene token'
        });
    }

    try {

        //verifico si soy capaz de obtener el token, sino se dispara el catch
        const { uid } = jwt.verify(token,process.env.JWTKEY);
        req.uid = uid;


        next();

    } catch (error) {
        return res.status(401).json({
            ok:false,
            msj:'token inválido'
        });
    }

    
}

module.exports = {
    validateJWT
}