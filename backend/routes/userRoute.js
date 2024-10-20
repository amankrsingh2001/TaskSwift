const express = require('express')
const { signup, signin, otp, updateToken } = require('../controller/user.controller')

const userRouter = express.Router()


userRouter.post('/otp', otp)
userRouter.post('/signup', signup)
userRouter.post('/signin', signin)
userRouter.post('/updateToken',updateToken)




module.exports = userRouter  

