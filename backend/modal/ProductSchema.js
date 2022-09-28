const mongoose = require('mongoose');


const productScehma = mongoose.Schema({

    title:{
        type:String
    },
    image:{
        type:String
    },
    countInStock:{
        type:Number
    }
});


const Product = mongoose.model('Product',productScehma);

module.exports = Product;