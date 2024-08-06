      const { User } = require('../schema/userSchema.js');
      const { registerNewUser,loginValidator } = require('../utils/zod.js');
      const bcrypt = require('bcrypt')
      const {createToken} = require("../middlewares/createToken.js")
      const {uploadOnCloudinary} = require('../utils/cloudinary.js')

    const registerUser = async(req,res)=>{
        const createPayload = req.body;
        const parsePayload = registerNewUser.safeParse(createPayload);
        if(!parsePayload.success){
        return res.status(400).json({msg:"Wrong input"})
        }
        const userCheck = await User.findOne({
            email:createPayload.email,
            username:createPayload.username
        })
        if(userCheck){
          return res.status(200).json({msg:"User already exist"})
        }
      try {
        let cloudinaryResponse= "";

        if(req.file){
             cloudinaryResponse = await uploadOnCloudinary(req.file.path);
        }

        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(createPayload.password,salt)
        const newUser = await User.create({
            username:createPayload.username,
            email:createPayload.email,
            password:password,
            name:createPayload.name,
            image:cloudinaryResponse
        })
        
        const user = await newUser.save();
        console.log(newUser,"New user");
        const token = createToken(user._id)
        return res.status(200).json({msg:"User created",token:token})
      } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"Failed to create User"})
      }
    }




const loginUser = async(req,res)=>{
  const loginParser = req.body;
  const payloadParser = loginValidator.safeParse(loginParser);
  if(!payloadParser.success){
    return res.status(400).json({msg:"Invaid input"})
  }
  try {
    const user = await User.findOne({
      email:loginParser.email
    })
    if(!user){
      return res.status(400).json({msg:"User doesn't exist"})
    }
    const isMatch = await bcrypt.compare(loginParser.password,user.password);
    if(!isMatch){
      return res.status(401).json({msg:"Unauthorized"});
    }
    const token = createToken(user._id)
    return res.status(200).json({token:token});
  } catch (error) {
    console.log(error)
      res.status(400).json({msg:"Authentication failed"})
  }
}




module.exports = {
  registerUser,
  loginUser
}
