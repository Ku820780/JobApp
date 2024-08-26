import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/EndPoints';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function useGetAllJobs() {
  const dispatch = useDispatch();
  
  // Corrected useSelector hook to access the job slice of the Redux store
  const { searchQuery } = useSelector(store => store.job);
  
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getalljobs?keyword=${searchQuery}`, { withCredentials: true });
        console.log(res.data);
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchAllJobs();
  }, [searchQuery, dispatch]); // Added searchQuery and dispatch to the dependency array
}

export default useGetAllJobs;
