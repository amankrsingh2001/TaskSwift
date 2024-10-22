const zod = require('zod')


const otpSchema = zod.object({
    username:zod.string()
})


const signupSchema = zod.object({
    username:zod.string(),
    password:zod.string().min(4).max(16),
    firstName:zod.string(),
    lastName:zod.string(),
    otp:zod.number(),
    token:zod.string().optional()
})

const signInSchema = zod.object({
    username:zod.string(),
    password:zod.string().min(4).max(16)
})

const boardSchema = zod.object({
    boardName:zod.string(),
    boardDescription:zod.string().optional(),
    isFavorite:zod.boolean().optional(),
    sharable:zod.boolean(),

})

module.exports = {
    otpSchema,
    signupSchema,
    signInSchema,
    boardSchema
}