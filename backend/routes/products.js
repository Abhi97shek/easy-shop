const express = require('express');
const Category = require('../modal/category');
const router = express.Router();
const Product = require('../modal/ProductSchema')

// GET API to get all the Products

router.get('/',async (req,res)=>{

    const productList = await Product.find().populate('category');

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

router.post('/', async (req,res)=>{
 
    const category  = await Category.findById(req.body.category);

    if(!category)
        {
            return res.status(500).json({success:false,message:"The Category is not valid"})
        }

        let product = new Product({
            name:req.body.name,
            description:req.body.description,
            richDescription:req.body.richDescription,
            image:req.body.image, 
            brand:req.body.brand, 
            price:req.body.price,
            category:req.body.category,
            countInStock:req.body.countInStock,
            rating:req.body.rating,
            numReviews:req.body.numReviews,
            isFeatured:req.body.isFeatured
        });
       
        product = await product.save();
        if(!product)
        {
            res.status(400).json({success:false,message:"Product cannot be created"})
        }
        else
        {
            res.status(200).send(product);
        }
});

// API to get the Product Detail using ID

router.get('/:id',async (req,res)=>{

    const product = await Product.findById(req.params.id).populate('category');

    if(!product)
        {
            res.status(404).json({success:false,message:"Product with this ID not Found"});
        }
        else
        {
            res.status(201).send({success:true,data:product});
        }



});

module.exports = router;