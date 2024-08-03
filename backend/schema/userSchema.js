const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength:5,

    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String
    },
    todoList:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Todo"
    }]
   
})

const User = mongoose.model('User',UserSchema)

module.exports={
    User
}
