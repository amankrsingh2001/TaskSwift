const express = require("express")
const app = express();
const dotenv = require('dotenv')
const {dbConnection} = require('./db/db.js');
const {  userRouter } = require("./routes/userRoute.js");
const { TodoRouter } = require("./routes/todoRoutes.js");

const port = 4000;

dotenv.config({
    path: './.env'
})
dbConnection();


app.use(express.json());


app.use('/',userRouter);
app.use('/todo',TodoRouter);

app.listen(port,()=>{
    console.log('App is on')
})