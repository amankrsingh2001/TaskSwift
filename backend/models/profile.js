const mongoose = require('mongoose')

const userProfile = new mongoose.Schema({
    firstName:{
        type:String,
        trim:true,
    },
    lastName:{
        type:String,
        trim:true,
    },
    profileImage:{
        type:String,
    },
    profession:{
        type:String
    },
    skills:[{
        type:String,
    }]
})

const Profile = mongoose.model('Profile', userProfile)

module.exports = {
    Profile
}