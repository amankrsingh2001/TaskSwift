const express = require('express')
const {addTodo, updateTodo} = require('../controller/todo.controller.js'); 
const { authMiddleWare } = require('../middlewares/auth.js');
{/*marked for validation */}


const TodoRouter = express.Router()

TodoRouter.post('/new',authMiddleWare,addTodo);
TodoRouter.put('/update',authMiddleWare,updateTodo)

module.exports = {
    TodoRouter,
}