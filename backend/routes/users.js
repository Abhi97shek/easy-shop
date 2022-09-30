const express= require('express');
const User = require('../modal/user');
const router = express.Router();
const bcrypt = require('bcryptjs');
const hashPassword = require("../helpers/hashPassword");
const jwt = require('jsonwebtoken'); 


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
    const secret = PROc
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

// User Login API

router.post("/login",async(req,res)=>{

    const user = await User.findOne({email:req.body.email});

    if(!user)
        {
            return res.status(404).send({message:"User Not Found"})
        }

    if(user && bcrypt.compareSync(req.body.password, user.passwordHash))
        {
            const secret = process.env.SECRET;
            const token = jwt.sign({
                email:user.email
            },  secret,{expiresIn:'1d'});
            const data ={
                email:user.email,
                token
            }
            res.status(200).send({success:true,data:data});
        }
        else
        {
            res.status(500).send({success:false,message:"User Authenticated Failed"})
        }
    

});








module.exports = router;