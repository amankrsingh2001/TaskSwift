const mongoose = require('mongoose')



exports.dbConnection = () =>{
    mongoose.connect('mongodb+srv://amandev:amankrsingh@cluster0.yff37w4.mongodb.net/gaolGuru')
    .then(()=>{
        console.log("DB Connected")
    })
    .catch((error)=>{
        console.error(error);
        process.exit(1);
    })
}

