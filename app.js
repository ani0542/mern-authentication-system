const express = require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const app = express()

app.get('/',(req,res)=>{
    res.send('aaj ka match jeetenge !')
})


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(cors())

app.use('/users',require('./routes/userRouter'))
app.use('/todos',require('./routes/todoRouter'))


//db connection
mongoose.connect(process.env.MONGODB_URL , ()=>{
    console.log('mongodb connected')
})

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is running on port 5000`)   
})