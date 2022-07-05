const { Schema, model } = require("mongoose");

const GroupchatSchema = Schema({
   
    groupname: {
        type: String,
        required: true,
    },
    members: [{
        userid: {
            type: Schema.Types.ObjectId,
            ref:'User',
            required: false
        },
        name: {
            type: String,
            required: false,
        },
    }],
},{
    timestamps:true
});

// extract what we need to show
GroupchatSchema.method('toJSON',function(){
    const { __v,_id, ...object} = this.toObject();
    return object;
});


module.exports = model('Groupchat',GroupchatSchema);