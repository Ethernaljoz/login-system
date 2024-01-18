const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    name:{
        type:String,
        minlength:3,
        required:true,
    },
    email:{
        type:String,
        required:true,
        minlength:10,
        unique:true
    },password:{
        type:String,
        required:true,
        minlength:5
    }
},
{
    timestamps:true,
})


module.exports= mongoose.model('User',userSchema)


























