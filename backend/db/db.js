const mongoose = require('mongoose')

async function dbConnection (){
    await mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log('connection established')
    })
}

module.exports ={
    dbConnection
}

