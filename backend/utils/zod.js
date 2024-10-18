const zod = require('zod')

const signupSchema = zod.object({
    username:zod.string(),
    password:zod.string().min(4).max(16),
    firstName:zod.string(),
    lastName:zod.string()
})

module.exports = {
    signupSchema
}