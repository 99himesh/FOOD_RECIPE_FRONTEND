import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../axios/axios"
const initialState = {
  isLoading:false,
  error:"",
  foodDetails:{}
};


export const createFoodDetailWithAiAsync = createAsyncThunk(
  "foodWithAi/foodWithAiAsync",
  async ({data,token}) => {
    try {
      const res = await api.post("ai/recipe-with-ai",data,{
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




export const createFoodSlice = createSlice({
  name: "foodAi",
  initialState,
  reducers: {

   
  },
  extraReducers: (builder) => {
  

     builder.addCase(createFoodDetailWithAiAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createFoodDetailWithAiAsync.fulfilled, (state, action) => {
      state.isLoading = false; 
      state.foodDetails=action.payload.food;

    });
    builder.addCase(createFoodDetailWithAiAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default createFoodSlice.reducer;