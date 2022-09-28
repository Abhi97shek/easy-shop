const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Product = require("./modal/ProductSchema");
const PORT = 3000;
require('dotenv').config();
const api = process.env.API_URL;

// MiddleWare

app.use(bodyParser.json());
app.use(morgan('tiny'));


// GET API to get all the Products

app.get(`${api}/products`,async (req,res)=>{

    const productList = await Product.find();

    if(!productList)
    {
        res.status(500).json({success:false})
    }
    else
    {
        res.status(201).send(productList);
    }

});

// POST api to Create the Product

app.post(`${api}/products`,(req,res)=>{

    
    const product = new Product({
        name:req.body.name,
        image:req.body.image,
        countInStock:req.body.countInStock
    });
    
    product.save().then((createdProduct)=>{
        res.status(201).json(createdProduct)
    }).catch((err)=>{
        res.status(500).json({
            error:err,
            success:failed
        });
    });

});


mongoose.connect(process.env.CONNECTION_STRING,{
    dbName:"eshop_database"
}).then(()=>{
    console.log("Connection is Ready.......")
}).catch((err)=>{console.log(err)});

app.listen(PORT,()=>{
    console.log(api);
    console.log(`Listening to the PORT ${PORT}`)
});