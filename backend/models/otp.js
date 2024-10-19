const mongoose = require('mongoose')
const { mailSender } = require('../utils/nodemailer')

const otpSchema = new mongoose.Schema({
    username:{
        type:String,
        requied:true,
        trim:true
    },
    otp:{
        type:Number,
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
    await sendVerificationEmail(this.username, this.otp, "opt")
    next()
})


const Otp = mongoose.model('Otp', otpSchema)
module.exports = {
    Otp
}