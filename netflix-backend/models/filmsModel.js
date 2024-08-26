const mongoose = require('mongoose');

const filmsSchema = mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    maturity:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    distributor_id:{
        type:String,
        required:true
    },
});

module.exports = mongoose.model("films",filmsSchema)