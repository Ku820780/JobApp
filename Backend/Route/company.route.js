const express = require('express')
const { registerCompany, getCompany, getCompanyById, updateCompany } = require('../controller/company.controller.js')
const companyRoute = express.Router()

const isAuthentication = require('../Middleware/isAuthentication.js')
const singleUpload = require('../Middleware/multer.js')

companyRoute.post('/companyregister',isAuthentication, registerCompany)
companyRoute.get('/getcompaydata',isAuthentication, getCompany)
companyRoute.get('/getdatabyid/:id',isAuthentication, getCompanyById)
companyRoute.put('/updatecompanydata/:id',isAuthentication, singleUpload, updateCompany)

module.exports = companyRoute;