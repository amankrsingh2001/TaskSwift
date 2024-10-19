const mongoose = require('mongoose')

const boardSchema = new mongoose.Schema({
    admin:{
        type:mongoose.schema.type.objectId,
        ref:"user"
    },
    boardName:{
        type:String,
        required:true,
        trim:true
    },

    boardDescription:{
        type:String,
        required:true,
        trim:true
    },
    category:[{
        type:String,
        required:true
    }],
    assignedUser:[{
        type:mongoose.schema.type.objectId,
        ref:"user"
    }],
    isFavorite:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

const Board = mongoose.model('Board', boardSchema)