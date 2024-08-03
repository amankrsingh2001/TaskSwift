const express = require('express')
const {addTodo, updateTodo, deleteTodo} = require('../controller/todo.controller.js'); 
const { authMiddleWare } = require('../middlewares/auth.js');
 
const TodoRouter = express.Router()



TodoRouter.post('/new',authMiddleWare,addTodo);
TodoRouter.put('/update/:id',authMiddleWare,updateTodo)
TodoRouter.delete('/delete/:id',authMiddleWare,deleteTodo)






module.exports = {
    TodoRouter,
}