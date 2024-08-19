const mongoose = require('mongoose');

const distributorSchema = mongoose.Schema({
    name:{
        type:String,
        default:false,
        required:true
    },
    email:{
        type:String,
        default:false,
        required:true
    },
    company_name:{
        type:[String],
        required:true,
    },
    content_id:{
        type:Array,
        required:false,
    },
    payment_list:{
        type:Array,
        required:false,
    },
    payment_id: {
        type:[String],
        required: false
    }
});

module.exports = mongoose.model("Distributor",distributorSchema)