import React, { useEffect, useState } from "react";
import FilterCards from "./FilterCards";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

// const jobArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function Jobs() {
  
  const {allJobs, searchQuery} = useSelector(store=>store.job)
  const [filterJob, setFilterJob] = useState(allJobs)

  useEffect(()=>{
    if(searchQuery){
      const filterdJob = allJobs.filter((job)=>{
        return job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) 
        // job.salary.toLowerCase().includes(searchQuery.toLowerCase())
      })
      setFilterJob(filterdJob)
    }else{
      setFilterJob(allJobs)
    }
  },[allJobs, searchQuery])
  
 
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            {" "}
            <FilterCards />
          </div>
          {filterJob.length <= 0 ? (
            <span>Job not Found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJob.map((job) => (
                  <motion.div 
                    initial={{ opacity: 0, x:100}}
                    animate={{opacity: 1, x: 0}}
                    exit={{opacity:0, x: -100}}
                    transition={{ duration: 0.3}}
                  key={job?._id}>
                    <Job job={job}/>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Jobs;
