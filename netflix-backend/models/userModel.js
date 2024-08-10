const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        default:false,
        required:false
    },
    email:{
        type:String,
        default:false,
        required:false
    },
    watchlist:{
        type:[String],
        required:false,
    },
    history:{
        type:Array,
        required:false
    },
    subscribed:{
        type:String,
        default:false,
        required:false
    },
    subsciption_end_date:{
        type:String,
        default:false,
        required: false 
    },
    recommendation:{
        type:Array,
        required: false 
    }
});

module.exports = mongoose.model("User",userSchema)