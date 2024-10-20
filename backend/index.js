const express = require("express")
const app = express();
const dotenv = require('dotenv')
const {dbConnection} = require('./db/db.js');
const mainRouter = require('./routes/mainRouter.js')
const cookieParser = require('cookie-parser')

const cors = require('cors')

dotenv.config({
    path: './.env'
})


dbConnection();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors())
app.use(cookieParser())


app.use('/api/v1/',mainRouter);


app.listen(port,()=>{
    console.log('App is listening on', port)
})