const mongoose = require('mongoose')
const { boolean } = require('zod')

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
        type:mongoose.Schema.Types.objectId,
        ref:"Category"
    }],
    assignedUser:[{
        type:mongoose.schema.type.objectId,
        ref:"user"
    }],
    isFavourite:{
        type:Boolean,
        default:false
    },
    shareable:{
        type:Boolean,
        require:true,
        default:false
    }
},{
    timestamps:true
})

const Board = mongoose.model('Board', boardSchema)

module.exports = Board