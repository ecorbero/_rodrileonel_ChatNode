const { Schema, model } = require("mongoose");

const MessageSchema = Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    to: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    message: {
        type: String,
        required: true,
    },
},{
    timestamps:true
});

//extraer solo lo que necesito que se muestre en la respuesta de mesaggeschema
MessageSchema.method('toJSON',function(){
    const { __v,_id, ...object} = this.toObject();
    return object;
});


module.exports = model('Message',MessageSchema);