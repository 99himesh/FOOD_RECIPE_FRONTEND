import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../axios/axios"
import { token } from "../constants/constants";
const initialState = {
  isLoading:false,
  error:"",
  home:{}
};



export const getHomeHandlerAsync = createAsyncThunk(
  "home/homeAsync",
  async ({}) => {
    
    try {
      const res = await api.get("home",{
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


export const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder.addCase(getHomeHandlerAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getHomeHandlerAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.home=action.payload?.home   
    });
    builder.addCase(getHomeHandlerAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
   
    
   
   
   
  },
});
export default mediaSlice.reducer;