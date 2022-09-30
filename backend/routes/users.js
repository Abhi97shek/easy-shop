const express= require('express');
const User = require('../modal/user');
const router = express.Router();
const bcrypt = require('bcryptjs');
const hashPassword = require("../helpers/hashPassword");




// API for Register a User
router.post("/",async (req,res)=>{

    let newPassword;
    if(req.body.password)
        {
            newPassword  = await hashPassword(req.body.password);
        }
    let newUser = new User({
        name:req.body.name,
        email:req.body.email,
        passwordHash: newPassword,
        phone:req.body.phone,
        street:req.body.street,
        isAdmin:req.body.isAdmin,
        apartment:req.body.apartment,
        zip:req.body.zip,
        country:req.body.country
    });

    newUser = await newUser.save();
    if(!newUser)
        {
         return res.status(500).json({success:false}); 
        }

        res.status(201).send(newUser);

});

// GET list of all User with Name,phone and Email


router.get("/",async (req,res)=>{

    const user = await User.find().select("name phone email");

    if(!user)
        {
         return res.status(500).json({success:false});
        }

    res.status(200).send(user);


});


// Get the User Details


router.get("/:id",async (req,res)=>{

    const user = await User.findById(req.params.id).select("-passwordHash");

    if(!user)
        {
            return res.status(500).json({success:false,message:"No User Found"});
        }

    res.status(200).send(user);
});









module.exports = router;