const mongoose = require('mongoose')



exports.dbConnection = () =>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("DB Connected")
    })
    .catch((error)=>{
        console.error(error);
        process.exit(1);
    })
}

