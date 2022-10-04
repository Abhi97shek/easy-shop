const express = require('express');
const Category = require('../modal/category');
const router = express.Router();
const Product = require('../modal/ProductSchema');
const mongoose = require('mongoose');
const multer = require('multer');


// Add the Multer DiskStorage for the Images
 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      const filename = file.originalname.split(' ').join('-');
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
  
  const upload = multer({ storage: storage })



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

router.post('/', upload.single('image'),async (req,res)=>{
 
    const category  = await Category.findById(req.body.category);

    if(!category)
        {
            return res.status(500).json({success:false,message:"The Category is not valid"})
        }
    
        const fileName = req.file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;


        let product = new Product({
            name:req.body.name,
            description:req.body.description,
            richDescription:req.body.richDescription,
            image:`${basePath}${fileName}`, 
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

// API to update a Product

router.put("/:id",async (req,res)=>{

    if(!mongoose.isValidObjectId(req.params.id))
        {
            return res.status(500).json({success:false,message:"Invalid Product Id"});
        }

    const category  = await Category.findById(req.body.category);

    if(!category)
        {
            return res.status(500).json({success:false,message:"The Category is not valid"})
        }

    const product = Product.findByIdAndUpdate(req.params.id,{
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
    },{new:true});

    if(!product)
    {
        res.status(500).send({success:false,message:"The Product cannot be created"});
    }
    else
    {
        res.status(201).send(product);
    }
});


// API to DELETE Product

router.delete('/:id',(req,res)=>{

    Product.findByIdAndRemove(req.params.id).then((product)=>{
        if(product)
        {
            res.status(200).json({success:true,message:"The Product sucessfully deleted"});
        }
        else
        {
            res.status(404).json({success:false,message:"the Product with the Id not Found"})
        }
    }).catch((err)=>{
        res.status(500).json({success:false,error:err});
    })
});

// API to count the Products

router.get("/get/count",async (req,res)=>{

    console.log("Hello");

    const productCount = await Product.countDocuments();

    if(!productCount)
    {
       return res.status(500).send({success:false});
    }
    else
    {
    res.status(200).send(productCount);
    }
    
});

// API to get the features Products

router.get("/get/featured/:count",async (req,res)=>{

    const count = req.params.count? req.params.count : 0;

    const product =await Product.find({isFeatured:true}).limit(+count);

    if(!product)
        {
          return  res.status(500).json({success:false})
        }

    res.status(200).send(product);

});

// API for filtering the Product

router.get("/get/filter",async (req,res)=>{

    // http://localhost:3000/api/v1/products?categories=231233312,2312312312

    let filter ={};

    if(req.query.categories)
    {
        console.log(req.query.categories);
        filter = {filter:req.query.categories.split(',')};
    }

    let productList = await Product.find(filter).populate('category');
    
    if(!productList)
    {
        res.status(500).json({success:false});
    }
    else
    {
        res.status(200).send(productList);
    }
    
    

});


module.exports = router;