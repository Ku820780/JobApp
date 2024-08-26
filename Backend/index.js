const express = require('express')
const cors = require('cors')
const Database = require('./utils/db.js')
const dotenv = require('dotenv')
const cookies = require("cookie-parser")
const userRoute = require('./Route/user.route.js')
const companyRoute = require('./Route/company.route.js')
const jobRouter = require('./Route/job.route.js')
const applyJob = require('./Route/application.route.js')
dotenv.config({})
const app = express()
app.use(express.json())
app.use(cookies())
const  PORT = process.env.PORT || 5600;

app.use(cors({
    origin:['http://localhost:5173'],
    methods:['POST', 'GET', 'DELETE', 'PUT'],
    credentials:true
}))

//api's

app.use('/api/v1/user', userRoute)
app.use('/api/v1/company', companyRoute)
app.use('/api/v1/job', jobRouter)
app.use('/api/v1/application', applyJob)

app.listen(PORT, ()=>{
  Database()
  console.log(`Server Running on ${PORT}`)
})