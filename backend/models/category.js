const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    assignedTodo:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'AssignedTodo'
    }],
    personalTodo:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'PersonalTodo'
    }]
})

const Category = new mongoose.model('Category', categorySchema)

module.exports ={
    Category
}