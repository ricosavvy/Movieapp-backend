require('dotenv').config() // Load variables from a .env file
let express = require('express')
let mongoose=require('mongoose')
let cors = require('cors')
let { join } = require('path')

let app = express()

if(process.env.DEV_ENV) // Make configuration in the env file
	app.use(cors())

mongoose.connect(process.env.DB_URI)

mongoose.connection.on('connected',_=>{
	console.log('connection estalished to database')
})

app.use(express.json({extended:true}))

app.use('/api',require('./api'))

app.use(express.static(join(__dirname,'public')))

app.use('*',(req,res)=>{
	res.sendFile(join(__dirname,'public','app','index.html'))	
})

app.listen(process.env.PORT,_=>{
	console.log(`server listening on http://${process.env.HOST}:${process.env.PORT}` )
})
