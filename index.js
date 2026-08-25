const express = require('express')
const app = express()
require('dotenv').config()
const connectDB = require('./config/db')
connectDB()
const logger = require('./middlewares/logger')
const notFound = require('./middlewares/notFound')
const errorHandler = require('./middlewares/errorHandler')


app.use(express.json())
app.use(logger)

app.use('/api/user',require('./routes/user'))
app.use('/api/doctor',require('./routes/doctor'))
app.use('/api/auth/user',require('./routes/userAuth'))
app.use('/api/auth/doctor',require('./routes/drAuth'))
app.use('/api/appointment',require('./routes/appointment'))

app.use(errorHandler)
app.use(notFound)

app.listen(process.env.PORT,()=>{
    console.log("server conected.");  
    
})



//(3) finish the rest of middlewares باقي الميدلويرز اللي لسه متعملتش
//(4) multer and nodemailer
//(5) readme and postman collections 
//(7)pagination 
//(8) check status code
//(9) pushed on github with editing gitignore file 
//()عاوز لما اختار دكتور معين ف وقت معين مينفعش حد غيره يختار نفس المعاد