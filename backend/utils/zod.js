const zod = require('zod')

const registerNewUser = zod.object({
    username:zod.string(),
    password:zod.string().min(5).max(16),
    email:zod.string().email(),
    name:zod.string()
})

const loginValidator = zod.object({
    email:zod.string().email(),
    password:zod.string()
})

const todoValidation = zod.object({
    title:zod.string(),
    description:zod.string().max(300),
    dueDate:zod.string(),

})



module.exports= {
    registerNewUser,
    loginValidator,
    todoValidation
}