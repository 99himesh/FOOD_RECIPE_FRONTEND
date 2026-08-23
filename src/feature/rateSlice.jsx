import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../axios/axios"
import { token } from "../constants/constants";
const initialState = {
  isLoading:false,
  error:"",
};


export const addRateAndReviewAsync = createAsyncThunk(
  "rate/addRateReview",
  async ({data}) => {
    try {
      const res = await api.post("rateReview/add",data,{
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
        }
      });      
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);




export const rateReviewSlice = createSlice({
  name: "rateAndReview",
  initialState,
  reducers: {

   
  },
  extraReducers: (builder) => {
  

     builder.addCase(addRateAndReview.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addRateAndReview.fulfilled, (state, action) => {
      state.isLoading = false; 

    });
    builder.addCase(addRateAndReview.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
   
        
    
   
   
   
  },
});

export default rateReviewSlice.reducer;