const mongooose = require('mongoose');

const CategorySchema = new mongooose.Schema({
    name:{
        type:String,
        required:true,
     },
},
{
   timestamps:true 
});

module.exports = mongooose.model("Category", CategorySchema);
