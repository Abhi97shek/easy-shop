const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;
require('dotenv').config();
const api = process.env.API_URL;

// MiddleWare

app.use(bodyParser.json());



// GET API to get all the Products

app.get(`${api}/products`,(req,res)=>{

    const product={
        id:1,
        name:"Abhishek",
        image_url:"https://loclahost.com"
    };

    res.send({message:'successfull',data:product});
});

// POST api to Create the Product

app.post(`${api}/products`,(req,res)=>{

    console.log("Hello")
    const newProduct = req.body;
    console.log(newProduct);
    res.send({message:'created Successfully',data:newProduct});

});



app.listen(PORT,()=>{
    console.log(api);
    console.log(`Listening to the PORT ${PORT}`)
});