const mongoose = require('mongoose')

const assignedTodoSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    taskName:{
        type:String,
        required:true,
        trim:true
    },
    taskDescription:{
        type:String,
        required:true,
        trim:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    images:[{
         type:String,
    }],
    startDate:{
        type:Date,
        default:Date.now()
    },
    endDate:{
        type:Date,
        default:() => Date.now()+ 7*24*60*60*1000 
    },
    status:{
        type:String,
        enum:['Assigned', "pending", "Done", "Backlog"]
    }


     

})

const AssignedTodo = mongoose.model("AssignedTodo", assignedTodoSchema)

module.exports = {
    AssignedTodo
}