const express = require('express')
const isAuthentication = require('../Middleware/isAuthentication.js')
const { applyJob, getAppliedJobs, getApplicants, updateStatus } = require('../controller/application.controller.js')
const route = express.Router()

route.get('/applyjob/application/:id',isAuthentication, applyJob)
route.get('/getappliedjob',isAuthentication, getAppliedJobs)
route.get('/:id/getapplicant',isAuthentication, getApplicants)
route.post('/status/:id/update',isAuthentication, updateStatus)

module.exports = route