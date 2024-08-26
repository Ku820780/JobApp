import  {createSlice}  from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        allAdminJobs:[],
        singleJob:null,
        searchJobsByText:"",
        allAppliedJob:[],
        searchQuery:"",
    },
    reducers:{
        //actions
        setAllJobs:(state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob:(state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs:(state, action) => {
            state.allAdminJobs = action.payload
        },
        setSearchJobsByText:(state, action) => {
            state.searchJobsByText = action.payload
        }, 
        setAllAppliedJob:(state, action) => {
            state.allAppliedJob = action.payload
        },
        setSearchQuery:(state, action) => {
            state.searchQuery = action.payload
        }
    }
});
export const {
    setAllJobs, 
    setSingleJob, 
    setAllAdminJobs, 
    setSearchJobsByText, 
    setAllAppliedJob,
    setSearchQuery} = jobSlice.actions;
export default jobSlice.reducer;