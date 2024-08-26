
const expres = require('express')
const { postJob, getAllJobs, getJobById, getAdminjobs } = require('../controller/job.controller.js')
const isAuthentication = require('../Middleware/isAuthentication.js')
const router = expres.Router()

router.post('/create/job',isAuthentication, postJob)
router.get('/getalljobs',isAuthentication, getAllJobs)
router.get('/getalljobsbyid/:id', isAuthentication, getJobById)
router.get('/admin/data/get', isAuthentication, getAdminjobs)

module.exports = router;