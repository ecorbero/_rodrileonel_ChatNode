const { response } = require("express");

const User = require('../models/user');


const getUsers = async (req,res=response) =>{

    const page = Number(req.query.page) || 0;

    const users = await User
        .find({_id:{ $ne: req.uid}}) //busco todos los usuarios cuyo id no sea el mio ne=notexist
        .sort('-online')// el '-' es para ordenarlos descendentemente
        .skip(page)
        .limit(20);

    res.json({
        ok : true,
        users
    });
};

module.exports = {
    getUsers
}