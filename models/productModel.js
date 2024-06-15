import mongoose, { Schema, model } from "mongoose";
//const { Schema } = mongoose;

const productSchema = new Schema({
    name : {
        type : String,
        require : true
    },
    price : {
        type : Number,
        require : true
    },
    image : {
        type : String,
        require : true
    },
    stock : {
        type : Number,
        require : true
    },
    timeStamp : {
        type : Date,
        default : Date.now
    },
    available : {
        type : Boolean,
        default : true
    }

});

export default model('Product', productSchema);
