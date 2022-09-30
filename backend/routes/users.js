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










module.exports = router;