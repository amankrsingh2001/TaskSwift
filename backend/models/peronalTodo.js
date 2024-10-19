const mongoose = require('mongoose')

const personalTodoSchema = new mongoose.Schema({
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
    },
    taskName:{
        type:String,
        required:true,
    },
    taskDescription:{
        type:String,
        required:true
    },
    taskImages:[{
        type:String,
    }],
    startDate:{
        type:Date,
        default:Date.now()
    },
    endDate:{
        type:Date,
        default: () => Date.now() + 7*24*60*60*1000
    },

    status:{
        type:String,
        enum:['Assigned', "pending", "Done", "Backlog"]
    }

},{
    timestamps:true
})

const PersonalTodo = mongoose.model('PersonalTodo', personalTodoSchema)

module.exports = {
    PersonalTodo
}