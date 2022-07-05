
const Groupchat = require('../models/groupchat');

const createGroup = async (req, res = response) => {

    const {groupname} = req.body 

    //console.log(req.body)

    try{

        const groupChat = new Groupchat(req.body);

        //validate if groupname already exists
        const groupnameExist = await Groupchat.findOne({groupname:groupname});
        if(groupnameExist){
            return res.status(400).json({
                ok: false,
                msg: 'Group name already exists'
            });
        } 

        await groupChat.save();

        res.json({
            ok : true,
            groupname,
            msg:'Group Sucsefully created'
            //message:req.body
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Unknown Error, Contact Admin'
        });
    }

};

const getGroup= async (req,res) => {

    const groupname = req.params.groupname;

    const groupChats = await Groupchat.find({groupname:groupname});

    res.json({
        ok:true,
        msj:groupChats,
    })

}


module.exports = {
    getGroup,
    createGroup
};