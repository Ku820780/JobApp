const Application  = require("../models/application.model.js");
const Job = require('../models/job.model.js')

const applyJob = async(req, res) => {
    try {
      const userId = req.id;
      const jobId = req.params.id;
      if(!jobId){
        return res.status(400).json({
            message:"Job Id is required.",
            success:false
        })
      }
      //check if the user has already applied for the job
      const existionApplication = await Application.findOne({job:jobId, applicant:userId})

      if(existionApplication){
        return res.status(400).json({
            message:"You have applied for the this jobs",
            success:false
        })
      }

      //check if the jobs exists
      const job = await Job.findById(jobId);
      if(!job){
        return res.status(404).json({
            message:"Job not found",
            success:false
        })
      }

      //create a new application
      const newApplication = await Application.create({
        job:jobId,
        applicant:userId
      })

      job.applications.push(newApplication._id);
      await job.save();
      return res.status(201).json({
        message:"Job applied successfully...",
        success:true
      })
    } catch (error) {
        console.log(error)
    }
}

const getAppliedJobs = async(req, res)=> {
    try {
       const userId = req.id;
       const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
        path:'job',
        options:{sort:{createdAt:-1}},
        populate:{
            path:'company',
            options:{sort:{createdAt:-1}},
        }
       });
       if(!application){
        return res.status(404).json({
            message:"No Application",
            success:true
        })
       }
       return res.status(200).json({
        application,
        success:true
       })
    } catch (error) {
        console.log(error)
    }
}


//Admin will checked how many user are applied job
const getApplicants = async(req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });
        if(!job){
            return res.status(404).json({
                message:"Job Not found.",
                success:false
            });
        }
        return res.status(200).json({
            job,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

const updateStatus = async(req, res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:"status is required",
                success:true
            })
        }

        //find the application by application id
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"Application not found.",
                success:false
            })
        }

        //update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"Status update successfully.",
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {applyJob, getAppliedJobs, getApplicants, updateStatus}