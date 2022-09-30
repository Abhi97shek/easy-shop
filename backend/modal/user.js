const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

     name:{
        type:String,
        required:true
     },
     email:{
        type:String,
        required:true
     },
     passwordHash:{
        type:String,
        require:true
     },
     phone:{
        type:Number,
        required:true
     },
     street:{
        type:String,
        default:''
     },
     isAdmin:{
        type:Boolean,
        default:false
     },
     apartment:{
        type:String,
        default:''
     },
     zip:{
        type:String,
        default:''
     },
     country:{
        type:String,
        default:''
     }

});

const User = mongoose.model('User',userSchema);

module.exports = User;