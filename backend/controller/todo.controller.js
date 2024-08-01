const {Todo} = require('../schema/todoSchema.js');
const { User } = require('../schema/userSchema.js');
const { todoValidation } = require('../utils/zod.js');


const addTodo = async(req,res)=>{
    const todoParser = req.body;
    const payloadParser = todoValidation.safeParse(todoParser);
    if(!payloadParser.success){
        return res.status(401).json({msg:"please provide clear input"})
    }
        const id = req.body.userId
       
    try {
        const newTodo = await Todo.create({
            title:todoParser.title,
            description:todoParser.description,
            dueDate:todoParser.dueDate,
            status:todoParser.status
        })
        const user = await User.updateOne({
            _id:id
        },{
            "$push":{
                todoList:newTodo._id
            }
        })

        return res.status(200).json({msg:'Todo created',todo:newTodo})
    } catch (error) {
        console.log(error)
        return res.status(402).json({msg:"Failed to create todo"})
    }
}

module.exports = {
    addTodo
}