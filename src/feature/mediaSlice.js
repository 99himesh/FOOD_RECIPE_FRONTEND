import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../axios/axios"
import { token } from "../constants/constants";
const initialState = {
  isLoading:false,
  error:""

};




export const uploadMediaHandlerAsync = createAsyncThunk(
  "media/uploadMedia",
  async ({formData}) => {    
    try {
      const res = await api.post("media/image", formData,{
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization":token
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
    builder.addCase(uploadMediaHandlerAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(uploadMediaHandlerAsync.fulfilled, (state, action) => {
      state.isLoading = false;   
    });
    builder.addCase(uploadMediaHandlerAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
   
    
   
   
   
  },
});
export default mediaSlice.reducer;