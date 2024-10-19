const express = require('express')
const userRouter = require('./userRoute')

const router = express.Router()

router.use('/user', userRouter)


module.exports = router
