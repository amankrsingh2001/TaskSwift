const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        unique:true,  
        required:true 
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    firstName:{
        type:String,
        trim:true,
        required:true
    },
    lastName:{
        type:String,
        trim:true,
        required:true
    },
    userProfile:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile"
    },
    boardList:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Board"
        }
]
},{
    timestamps:true
})

const User = mongoose.model("User", userSchema)

module.exports = {
    User
}