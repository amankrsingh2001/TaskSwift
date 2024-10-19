const zod = require('zod')


const otpSchema = zod.object({
    username:zod.string()
})


const signupSchema = zod.object({
    username:zod.string(),
    password:zod.string().min(4).max(16),
    firstName:zod.string(),
    lastName:zod.string(),
    otp:zod.number()
})

const signInSchema = zod.object({
    username:zod.string(),
    password:zod.string().min(4).max(16)
})



module.exports = {
    otpSchema,
    signupSchema,
    signInSchema
}