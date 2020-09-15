const mongoose = require("mongoose");


const musicschema = mongoose.Schema({
    url:{
        type:String,
      
        versionKey: false 
    },
    title:{
        type:String,
      
        versionKey: false 
    },
    album:{
        type:String,
      
        versionKey: false 
    },
    artist:{
        type:String,
      
        versionKey: false 
    },
    img:{
        type:String,
      
        versionKey: false 
    },
    __v: { type: Number, select: false
    },

},{collection:"musicdata"})

module.exports=mongoose.model("musicdata",musicschema)