import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../axios/axios"
import Cookies from "js-cookie";
const token=Cookies.get("token")
const initialState = {
  token:token || null,
  isLoading:false,
  error:"",
  authors:[],
  authorsById:{}

};


export const signUpHandlerAsync = createAsyncThunk(
  "user/signUp",
  async ({data}) => {
    
    try {
      const res = await api.post("user/signup", data,{
        headers: {
          "Content-Type": "application/json",
        }
      });      
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const loginHandlerAsync = createAsyncThunk(
  "user/login",
  async ({data}) => {    
    try {
      const res = await api.post("user/login", data,{
        headers: {
          "Content-Type": "application/json",
        }
      });      
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);


export const getAuthorHandlerAsync = createAsyncThunk(
  "user/getAuthors",
  async ({data,token}) => {    
    try {
      const res = await api.get("user/getUsers",{
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
        },
        params:{
          ...data
        }
      });      
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);



export const followUserHandlerAsync = createAsyncThunk(
  "user/follow",
  async ({data,token}) => {    
    try {
      const res = await api.post("followers/follow", data,{
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
export const UnfollowUserHandlerAsync = createAsyncThunk(
  "user/unfollow",
  async ({id,token}) => {    
    try {
      const res = await api.delete(`followers/unfollow/${id}`,{
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

//:id

export const getAuthorByIdHandlerAsync = createAsyncThunk(
  "user/getAuthorsById",
  async ({id,token}) => {    
    try {
      const res = await api.get(`/user/getuser/${id}`,{
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

export const updateUserHAndlerAsync = createAsyncThunk(
  "user/updateUser",
  async ({id,data,token}) => {    
    try {
      const res = await api.put(`/user/updateUser/${id}`,data,{
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

export const deleteUserHandlerAsync = createAsyncThunk(
  "user/deleteUser",
  async ({id,token}) => {    
    try {
      const res = await api.delete(`/user/deleteUser/${id}`,{
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


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    followUserHandler:(state,action)=>{
      const findIndex=state.authors?.result?.findIndex(item=>item.id==action.payload)
      
     state.authors.result[findIndex].isFollow=true
    },
    unFollowUserHandler:(state,action)=>{
      const findIndex=state.authors?.result?.findIndex(item=>item.id==action.payload)

     state.authors.result[findIndex].isFollow=false
    },
    updateUserHandler:(state,action)=>{
       const index=state.authors.findIndex(item=>item?.id==action.payload?.id)
       state.authors[index].role=action.payload?.role
    },
    deleteUserHandler:(state,action)=>{      
      const findIndex=state.authors?.result?.findIndex(item=>item.id==action.payload);
      state.authors?.result?.splice(findIndex,1)
    },
    blockedHandler:(state,action)=>{
       const findIndex=state.authors?.result?.findIndex(item=>item.id==action.payload.id);
       state.authors.result[findIndex].isBlock=action.payload?.isBlock

    },
    logoutHandler:(state,action)=>{
      Cookies.remove("token");
      Cookies.remove("role");
      state.token=null;
    }


   
  },
  extraReducers: (builder) => {
    builder.addCase(signUpHandlerAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signUpHandlerAsync.fulfilled, (state, action) => {
      state.isLoading = false;   
    });
    builder.addCase(signUpHandlerAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

     builder.addCase(loginHandlerAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginHandlerAsync.fulfilled, (state, action) => {
      state.isLoading = false; 
      state.token=action.payload.token;
      Cookies.set("token",action.payload.token);
      Cookies.set("role",action.payload.user?.role);
      Cookies.set("userId",action.payload.user?.id);
      Cookies.set("userName",action.payload.user?.name);

    });
    builder.addCase(loginHandlerAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

     builder.addCase(getAuthorHandlerAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAuthorHandlerAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.authors=action.payload;

    });
    builder.addCase(getAuthorHandlerAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.authors=[];

    });
    builder.addCase(getAuthorByIdHandlerAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAuthorByIdHandlerAsync.fulfilled, (state, action) => {
      state.isLoading = false; 
      state.authorsById=action.payload.user;

    });
    builder.addCase(getAuthorByIdHandlerAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    
    builder.addCase(followUserHandlerAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(followUserHandlerAsync.fulfilled, (state, action) => {
      state.isLoading = false; 

    });
    builder.addCase(followUserHandlerAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(UnfollowUserHandlerAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(UnfollowUserHandlerAsync.fulfilled, (state, action) => {
      state.isLoading = false; 

    });
    builder.addCase(UnfollowUserHandlerAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateUserHAndlerAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserHAndlerAsync.fulfilled, (state, action) => {
      state.isLoading = false; 

    });
    builder.addCase(updateUserHAndlerAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteUserHandlerAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUserHandlerAsync.fulfilled, (state, action) => {
      state.isLoading = false; 

    });
    builder.addCase(deleteUserHandlerAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const {logoutHandler,followUserHandler,unFollowUserHandler,updateUserHandler,deleteUserHandler,blockedHandler}=userSlice.actions;
export default userSlice.reducer;