const express = require('express')
const {registerUser, loginUser} = require('../controller/user.controller.js');
const {upload} = require('../middlewares/multer.middleware.js')



const userRouter = express.Router()

userRouter.post('/register',upload.single("image"),registerUser);
userRouter.post('/login',loginUser);


module.exports = {userRouter} 