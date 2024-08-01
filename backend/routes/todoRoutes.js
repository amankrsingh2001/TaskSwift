const express = require('express')
const {addTodo} = require('../controller/todo.controller.js'); 
const { authMiddleWare } = require('../middlewares/auth.js');
{/*marked for validation */}


const TodoRouter = express.Router()

TodoRouter.post('/new',authMiddleWare,addTodo);

module.exports = {
    TodoRouter,
}