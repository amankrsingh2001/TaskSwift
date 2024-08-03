const {Todo} = require('../schema/todoSchema.js');
const { User } = require('../schema/userSchema.js');
const { todoValidation } = require('../utils/zod.js');


const addTodo = async(req,res)=>{
    const todoParser = req.body;
    const payloadParser = todoValidation.safeParse(todoParser);
    if(!payloadParser.success){
        return res.status(411).json({msg:"please provide clear input"})
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


const updateTodo = async (req, res) => {
    const todoParser = req.body;
    const payloadParser = todoValidation.safeParse(todoParser)
    if(!payloadParser){
        return res.status(411).json({msg:"Validation error"})
    }
    const todoId = req.params.id;
    const {id} = req.authorization;
 try {
        const {todoList} = await User.findOne({
            _id:id
        })
        let flag = false;
        todoList.forEach(( _id )=>{
            if(_id.equals(todoId)){
                flag = true;        
            }
        })
        if(!flag){
            return res.status(401).json({msg:"Todo doesnt exist"})
        }

        const todoUdpate = await Todo.findOneAndUpdate({_id:todoId},{
            title:todoParser.title,
            description:todoParser.description,
            image:todoParser.image,
            status:todoParser.status
        })
    return res.status(200).json({msg:"Todo updated"})
 } catch (error) {
    console.log(error)
    return res.status(401).json({msg:"Failed to update todo"})
 }

}




module.exports = {
    addTodo,
    updateTodo
}