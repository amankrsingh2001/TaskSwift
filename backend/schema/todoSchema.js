const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        
    },
    image:{
        type:String,
    },
    status:{
        type:String,
        enum:['pending','ongoing','done','backlog'],
        default:"pending",
        required:true
    },
    dueDate:{
        type:Date,
        required:true,
    }
})

const Todo = mongoose.model('Todo',todoSchema);

module.exports ={
    Todo
}