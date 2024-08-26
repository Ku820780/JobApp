import { createSlice } from "@reduxjs/toolkit";

const applicantsSlice = createSlice({
    name:"applicantion",
    initialState:{
        allapplicants:[]
    },
    reducers:{
        setAllapplicants:(state, action)=>{
            state.allapplicants = action.payload
        }
    }
})

export const {setAllapplicants} = applicantsSlice.actions;
export default applicantsSlice.reducer;