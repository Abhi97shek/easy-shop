const express= require('express');
const router = express.Router();
const Category = require('../modal/category');


// API to GET all the Categories

router.get("/", async (req,res)=>{


    const allCategories = await Category.find();

    if(!allCategories)
    {
        res.status(500).json({success:false})
    }
    else
    {
        res.status(200).json({success:true,data:allCategories})
    }


});

// API to get alt Details about Category

router.get('/:id',async (req,res)=>{


    const category = await Category.findById(req.params.id);

    if(!category)
    {
        res.status(404).json({success:false,message:"The Category witht the given ID is not Found"});
    }
    else
    {
        res.status(200).send(category);
    }
});

// API to UPDATE a Category

router.put("/:id",async (req,res)=>{

    const category = await Category.findByIdAndUpdate(
        req.params.id,{
            name:req.body.name,
            icon:req.body.icon,
            color:req.body.color
        },{
            new:true
        }
    )

    if(!category)
    {
        res.status(404).json({success:false,message:"The Category witht the given ID is not Found"});
    }
    else
    {
        res.status(200).send(category);
    }

});







// API to created an Category

 router.post("/", async(req,res)=>{

    let newCategory = new Category({
        name: req.body.name,
        color:req.body.color,
        icon:req.body.icon
    }); 

    newCategory = await newCategory.save();

    if(!newCategory)
    {
        res.status(404).send('the Category cannot be created');
    }
    else
    {
        res.status(201).send(newCategory);
    }

 });

//  API to delete a Category

router.delete("/:id",(req,res)=>{

    Category.findByIdAndRemove(req.params.id).then((category)=>{
        if(category)
            {
                res.status(200).json({success:true,message:"the category deleted successfully"})
            }
            else
            {
                res.status(404).json({success:false,message:'Category not deleted'})
            }
    }).catch((err)=>{
        return res.status(400).json({success:false,error:err});
    })
});







module.exports = router;