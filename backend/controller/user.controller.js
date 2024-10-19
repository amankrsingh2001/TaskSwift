const { Otp } = require("../models/otp");
const { Profile } = require("../models/profile")
const { User } = require("../models/user")
const { signupSchema, otpSchema, signInSchema } = require("../utils/zod")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { generateOtp } = require('otpgeneratorpro');

//Status code 
//  404 if user not found
// 401 unauthorized

const otp = async(req, res)=>{
    const body = req.body
    const {success} = otpSchema.safeParse(body)
    if(!success){
        return res.status(401).json({
            success:false,
            message:"Email/Username isn't valid"
        })
    }
    try {
        const newOtp = generateOtp(6, { 
            digits: true, 
            lowerCaseAlphabets: false, 
            upperCaseAlphabets: false, 
            specialChars: false 
        });

        const otp = await Otp.create({
            username:body.username,
            otp:newOtp
        })
        if(!otp){
            return res.status(401).json({
                success:false,
                message:"Failed to send otp"
            })
        }

        return res.status(200).json({
            success:true,
            message:'Otp send successfully'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Something went wrong please try again later"
        })        
    }
}


const signup = async(req, res) =>{
  try {
      const body = req.body

      const {success} = signupSchema.safeParse(body)
  
      if(!success){
          return res.status(401).json({
              success:false,
              message:"Please enter valid data"
          })
      }

      const user = await User.findOne({
          username:body.username
      })
  
      if(user){
          return res.status(401).json({
              success:false,
              message:"User already exist"
          })
      }
      
      const recentOtp = await Otp.findOne({
        username:body.username
      }).sort({createdAt:-1}).limit(1)

      if(recentOtp.otp !== body.otp){
            return res.status(401).json({
                success:false,
                message:"Otp verfication failed",
            })
      }

      const userProfile = await Profile.create({
        firstName:body.firstName,
        lastName:body.lastName,
        profileImage:`https://api.dicebear.com/5.x/initials/svg?seed=${body.firstName} ${body.lastName}`,
        profession:'',
        skills:[]
      })
  
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(body.password, salt);
  
  
      const newUser = await User.create({
          username:body.username.toLowerCase(),
          password:hashedPassword,
          firstName:body.firstName,
          lastName:body.lastName,
          userProfile:userProfile._id,
      })
      const createUser = await User.findOne({
        _id:newUser._id
      }).populate('userProfile')

         createUser.password = undefined;
  
      if(newUser._id){
          return res.status(200).json({
              success:true,
              message:"Account created successfully",
              data:createUser
          })
      }
  } catch (error) {
    return res.status(500).json({
        success:false,
        message:error.message
    })
  }

}


const signin = async(req, res)=>{
    const body = req.body;
    const {success} = signInSchema.safeParse(body)
    if(!success){
        return res.status(401).json({
            success:false,
            message:"Email/Password isn't valid"
        })
    }
    try {
        const user =await User.findOne({
            username:body.username
        })

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User doesn't exist"
            })
        }

        const verifyPassword = await bcrypt.compare(body.password, user.password)

        if(!verifyPassword){
            return res.status(401).json({success:false, message:"Please provide valid email or password"});
        }

        const token = jwt.sign({ 
           id:user._id
         },process.env.JWT_SECRET,{
            expiresIn:'5h'
         });

        user.password = undefined;

        return res.status(200).json({
            success:true,
            message:'Logged in Successfully',
            token:token,
            data:user
            
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports = {
    otp,
    signup,
    signin,
}