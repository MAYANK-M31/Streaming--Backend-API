const mongoose = require("mongoose");


const artistsschema = new mongoose.Schema({
    artist:{
        type:String,
      
        versionKey: false 
    },
    image:{
        type:String,
      
        versionKey: false 
    },
    __v: { type: Number, select: false
    },

},{collection:"artists"})

module.exports=mongoose.model("artists",artistsschema)