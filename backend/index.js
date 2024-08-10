const express = require("express")
const app = express();
const dotenv = require('dotenv')
const {dbConnection} = require('./db/db.js');
const {  userRouter } = require("./routes/userRoute.js");
const { TodoRouter } = require("./routes/todoRoutes.js");
const cors = require('cors')

dotenv.config({
    path: './.env'
})


dbConnection();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors())

app.use('/',userRouter);
app.use('/todo',TodoRouter);

app.listen(port,()=>{
    console.log('App is listening on', port)
})