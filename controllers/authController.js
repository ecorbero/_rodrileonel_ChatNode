const { response, json } = require("express");
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateToken } = require("../helpers/jwt");

const createUser = async (req, res = response) => {

    const{ email,password } = req.body 
    //const email = req.body.email // es lo mismo

    try{

        const user = new User(req.body);

        //validar si ya existe el correo
        const emailExist = await User.findOne({email:email});
        if(emailExist){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            });
        }

        //ecriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password , salt);

        //genero JWT (jason web token)
        const token = await generateToken(user.uid);
        
        await user.save();

        res.json({
            ok : true,
            user,
            token
            //message:req.body
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Ocurrio un error desconocido, hable con el administrador'
        });
    }

};

const loginUser = async (req, res = response) => {

    const{ email,password } = req.body 
    //const email = req.body.email // es lo mismo

    try{
        //valido usuario
        const userDB = await User.findOne({email});
        if(!userDB){
            return res.status(404).json({
                ok:false,
                msj: 'usuario no encontrado'
            });
        }

        //valido password
        const validPw = bcrypt.compareSync(password,userDB.password);
        if(!validPw){
            return res.status(400).json({
                ok:false,
                msj: 'contraseña invalida'
            });
        }

        //genero JWT (jason web token)
        const token = await generateToken(userDB.id);

        res.json({
            ok : true,
            user:userDB,
            token
            //message:req.body
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Ocurrio un error desconocido, hable con el administrador'
        });
    }

};

const renewToken = async(req,res=response) => {

    try{

        const uid  = req.uid 

        //genero nuevo JWT (jason web token)
        const token = await generateToken({uid});

        //valido usuario
        const userDB = await User.findById(req.uid);
        if(!userDB){
            return res.status(404).json({
                ok:false,
                msj: 'token invalido'
            });
        }

        res.json({
            ok : true,
            userDB,
            token
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Ocurrio un error desconocido, hable con el administrador'
        });
    }
}


module.exports = {
    createUser,
    loginUser,
    renewToken
}