import { setAllAppliedJob } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/EndPoints";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetAllAppliedJob() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAppliedJob = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/getappliedjob`,{ withCredentials: true });
        console.log(res.data)
        if(res.data.success){
            dispatch(setAllAppliedJob(res.data.application))
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllAppliedJob()
  }, []);
}

export default useGetAllAppliedJob;
