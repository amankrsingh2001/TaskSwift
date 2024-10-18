const mongoose = require('mongoose')
const { mailSender } = require('../utils/nodemailer')

const otpSchema = new mongoose.Schema({
    username:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
    }
})



async function sendVerificationEmail(username, otp){
    try{
        const mailResponse = await mailSender(username,'Verification from Task Swift', otp)
    }catch(error){
        console.log(error,"Error from otp schema")
        throw new Error(error)
    }
}

otpSchema.pre("save", async function (next) {
    await sendVerificationEmail(this.user, this.otp)
    next()
})


const Otp = mongoose.model('Otp', otpSchema)
module.exports = {
    Otp
}