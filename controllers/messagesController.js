
const Message = require('../models/message');

const getChat = async (req,res) => {

    const uid = req.uid;
    const mFrom = req.params.from;

    const last30 = await Message.find({
        $or: [{from:uid,to:mFrom},{from:mFrom,to:uid}]
    })
    .sort({createdAt:'desc'})
    .limit(30);

    res.json({
        ok:true,
        msj:last30,
    })

}

module.exports = {
    getChat
}