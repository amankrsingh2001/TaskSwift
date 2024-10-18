const nodemailer = require("nodemailer");

const mailSender = async(email, title, body) =>{
    try {
            let transporter = nodemailer.createTransport({
                host:'hostname',
                auth:{
                    user:"userEmail",
                    pass:"userPass"
                }
            })
            let info = await transporter.sendMail({
                from:"Task Swift ",
                to:`${email}`,
                subject:`${title}`,
                html:`${body}`
            })
            return info
    } catch (error) {
        console.log(error)
    throw new Error('Failed to send mail')        
    }
}

module.exports ={
    mailSender
}