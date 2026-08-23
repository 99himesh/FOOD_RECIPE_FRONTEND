import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../axios/axios"
import { token } from "../constants/constants";
const initialState = {
  isLoading:false,
  error:"",
  notification:[],
  notificationCount:null
};


export const notificationHandlerAsync = createAsyncThunk(
  "notification/getNotificationAsync",
  async ({}) => {
    try {
      const res = await api.get("notifications/getNotification",{
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
export const notificationCountHandlerAsync = createAsyncThunk(
  "notification/getNotificationCountAsync",
  async ({}) => {
    try {
      const res = await api.get("notifications/getCountNotification",{
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

export const deleteNotificationHandlerAsync = createAsyncThunk(
  "notification/deleteNotificationAsync",
  async ({id}) => {
    try {
      const res = await api.delete(`notifications/deleteNotification/${id}`,{
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
export const deleteAllNotificationHandlerAsync = createAsyncThunk(
  "notification/deleteAllNotificationAsync",
  async ({}) => {
    try {
      const res = await api.delete(`notifications/deleteAllNotification`,{
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


export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
     addToNotification:(state,action)=>{
        state.notification=[action.payload,...state.notification]
        state.notificationCount=state.notificationCount+1
     },
     deleteNotification:(state,action)=>{
       const findIndex=state.notification.findIndex(item=>item.id==action.payload);
       state.notification.splice(findIndex,1);
       state.notificationCount=state.notificationCount-1
     }

   
  },
  extraReducers: (builder) => {
  

     builder.addCase(notificationHandlerAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(notificationHandlerAsync.fulfilled, (state, action) => {
      state.isLoading = false; 
      state.notification=action.payload?.result?.notification;

    });
    builder.addCase(notificationHandlerAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(notificationCountHandlerAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(notificationCountHandlerAsync.fulfilled, (state, action) => {
      state.isLoading = false; 
      console.log(action.payload.notificationCount);
      
      state.notificationCount=action.payload.notificationCount;

    });
    builder.addCase(notificationCountHandlerAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteNotificationHandlerAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteNotificationHandlerAsync.fulfilled, (state, action) => {
      state.isLoading = false; 
      

    });
    builder.addCase(deleteNotificationHandlerAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteAllNotificationHandlerAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteAllNotificationHandlerAsync.fulfilled, (state, action) => {
      state.isLoading = false; 
      state.notification=[];
      state.notificationCount=0
      

    });
    builder.addCase(deleteAllNotificationHandlerAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    

    
    
        
    
   
   
   
  },
});

export const {addToNotification,deleteNotification}=notificationSlice.actions;
export default notificationSlice.reducer;