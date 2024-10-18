const { Profile } = require("../models/profile")
const { User } = require("../models/user")
const { signupSchema } = require("../utils/zod")
const bcrypt = require('bcrypt')



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


const login = async(req, res)=>{
    const body = req.body;
    try {

    } catch (error) {
        
    }
}

module.exports = {
    signup
}