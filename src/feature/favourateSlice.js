import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../axios/axios"
const initialState = {
  isLoading:false,
  error:"",
  favourate:[]
};


export const addToFavourateHandlerAsync = createAsyncThunk(
  "favourate/addToFavourate",
  async ({data,token}) => {
    
    try {
      const res = await api.post("favourate/add", data,{
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

export const getFavourateHandlerAsync = createAsyncThunk(
  "favourate/getFavourate",
  async ({token}) => {
    
    try {
      const res = await api.get("favourate/getFavourate",{
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
export const removeFromFavourateHandlerAsync = createAsyncThunk(
  "favourate/removeFromFavourate",
  async ({id,token}) => {
    
    try {
      const res = await api.delete(`favourate/deleteFavourate/${id}`,{
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




export const favourateSlice = createSlice({
  name: "favourate",
  initialState,
  reducers: {
    removeFromFavourate:(state,action)=>{      
        const findIndex=state.favourate?.findIndex(item=>item.RecipeId==action.payload);
        
        state.favourate.splice(findIndex,1)
    }
     
   
  },
  extraReducers: (builder) => {
    builder.addCase(addToFavourateHandlerAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addToFavourateHandlerAsync.fulfilled, (state, action) => {
      state.isLoading = false;   
    });
    builder.addCase(addToFavourateHandlerAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

     builder.addCase(getFavourateHandlerAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFavourateHandlerAsync.fulfilled, (state, action) => {
      state.isLoading = false; 
      state.favourate=action.payload.favourate;

    });
    builder.addCase(getFavourateHandlerAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.favourate=[]
    });

     builder.addCase(removeFromFavourateHandlerAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeFromFavourateHandlerAsync.fulfilled, (state, action) => {
      state.isLoading = false; 

    });
    builder.addCase(removeFromFavourateHandlerAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});
export const {removeFromFavourate}=favourateSlice.actions;

export default favourateSlice.reducer;