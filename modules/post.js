const mongooose = require('mongoose');

const PostSchema = new mongooose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    descriptions: {
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:false,

    },
    username:{
        type:String,
        required:true
    },
    categories:{
        type:Array,
        required:true

    },
}, 
{
   timestamps:true 
});

module.exports = mongooose.model("Post", PostSchema);
