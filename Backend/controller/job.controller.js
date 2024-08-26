const Job  = require("../models/job.model.js");

//company//
const postJob = async(req, res) => {
    try {
        const {title, description, requirements, salary, location, jobType, experinceLevel, position, companyId} = req.body
        const userId = req.id;
        if(!title || !description || !requirements || !salary || !location || !jobType || !experinceLevel || !position || !companyId )
            {
                return res.status(400).json({
                    message:"Something is missing..",
                    success:false
                })
            }

        const job = await Job.create({
            title, 
            description, 
            requirements: requirements.split(","), 
            salary:Number(salary), 
            location, 
            jobType, 
            experinceLevel, 
            position, 
            company:companyId, 
            created_by:userId
        })

        return res.status(201).json({
            message:"new Job created successfully..",
            job,
            success:true
        })
    } catch (error) {
       console.log(error) 
    }
   
}
//student
const getAllJobs = async(req, res) => {
    try {
        const keyword = req.query.keyword || ""
        const query = {
            $or:[
                {title:{$regex:keyword, $options:"i"}},
                {description:{$regex:keyword, $options:"i"}}
            ]
        };
        const jobs = await Job.find(query).populate({  //populate ka hm used krte hai kisi ka full details dekh ne ke liyea
            path:"company"
        }).sort({createdAt:-1});
        if(!jobs){
            return res.status(404).json({
                message:"Jobs Not found.",
                success:false
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })

    } catch (error) {
        console.log(error)
    }
}
//student
const getJobById = async(req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        })
        if(!job){
            return res.status(404).json({
                message:"Jobs Not found.",
                success:false
            })
        }
        return res.status(200).json({job, success:true})
    } catch (error) {
        console.log(error)
    }
}


// how many jobs created by admin in this time

const getAdminjobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({created_by: adminId}).populate({
            path:"company",
            createdAt:-1
        });
        if(!jobs){
            return res.status(404).json({
                message:"Jobs Not found.",
                success:false
            })
        }
        return res.status(200).json({jobs, success:true})

    } catch (error) {
        console.log(error)
    }
}
module.exports = {postJob, getAllJobs,getJobById, getAdminjobs}