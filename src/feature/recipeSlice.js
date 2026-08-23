import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../axios/axios"
import { token } from "../constants/constants";
console.log(token,"token");

const initialState = {
  isLoading:false,
  error:"",
  recipes:[],
  recipe:{},
  recipesByUser:[]
 
};


export const getAllRecipeHandlerAsync = createAsyncThunk(
  "recipe/getAllRecipe",
  async ({data}) => {
    try {
      const res = await api.get("recipe/getAllrecipe",{
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearor ${token}`
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
export const getRecipeByUserIdHandlerAsync = createAsyncThunk(
  "recipe/getRecipeByUserId",
  async ({data,id}) => {
    try {
      const res = await api.get(`recipe/getRecipeByUserId/${id}`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearor ${token}`
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
export const getRecipeByIdHandlerAsync = createAsyncThunk(
  "recipe/getRecipeById",
  async ({id}) => {
    try {
      const res = await api.get(`recipe/getRecipe/${id}`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearor ${token}`
        }
    
      });      
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const createRecipeHandlerAsync = createAsyncThunk(
  "recipe/createRecipe",
  async ({data}) => {
    try {
      const res = await api.post(`recipe/add`,data,{
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearor ${token}`
        }
    
      });      
      return res.data;
    } catch (error) {
      console.log(error);
      
      throw error;
    }
  }
);


export const updateRecipeHandlerAsync = createAsyncThunk(
  "recipe/updateRecipe",
  async ({data,id}) => {
    try {
      const res = await api.put(`recipe/updateRecipe/${id}`,data,{
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearor ${token}`
        }
    
      });      
      return res.data;
    } catch (error) {
      console.log(error);
      
      throw error;
    }
  }
);

export const deleteRecipeHandlerAsync = createAsyncThunk(
  "recipe/deleteRecipe",
  async ({id}) => {
    try {
      const res = await api.delete(`recipe/deleteRecipe/${id}`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearor ${token}`
        }
    
      });      
      return res.data;
    } catch (error) {
      console.log(error);
      
      throw error;
    }
  }
);






export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
     deleteRecipeHandler:(state,action)=>{
     const findIndex=state.recipes?.recipe?.findIndex(item=>item.id==action.payload)
      state.recipes?.recipe?.splice(findIndex,1)
     
    },
    deleteUserRecipeHandler:(state,action)=>{
     const findIndex=state.recipesByUser?.recipe?.findIndex(item=>item.id==action.payload)
      state.recipesByUser?.recipe?.splice(findIndex,1)
     
    },
    deleteAllRecipe:(state,action)=>{
      state.recipes=[]
    },
    favourateInAllRecipe:(state,action)=>{
      const findIndex=state.recipes?.recipe?.findIndex(item=>item.id==action.payload);
      console.log(state.recipes.recipe);
      
      state.recipes.recipe[findIndex].isFavourate=!state.recipes.recipe[findIndex].isFavourate;
    },
    favourateInRecipeByUser:(state,action)=>{
      const findIndex=state.recipesByUser?.recipe?.findIndex(item=>item.id==action.payload);
    
      
      state.recipesByUser.recipe[findIndex].isFavourate=!state.recipesByUser.recipe[findIndex].isFavourate;
    }
   
  },
  extraReducers: (builder) => {
    builder.addCase(getAllRecipeHandlerAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllRecipeHandlerAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload,"dfg");
      
      state.recipes=action.payload.recipe  
    });
    builder.addCase(getAllRecipeHandlerAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getRecipeByUserIdHandlerAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRecipeByUserIdHandlerAsync.fulfilled, (state, action) => {
      state.isLoading = false;  
      console.log(action.payload,"kgjhfjf");
          
      state.recipesByUser=action.payload.recipe;  
    });
    builder.addCase(getRecipeByUserIdHandlerAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getRecipeByIdHandlerAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRecipeByIdHandlerAsync.fulfilled, (state, action) => {
      state.isLoading = false;      
      state.recipe=action.payload.recipe  
    });
    builder.addCase(getRecipeByIdHandlerAsync.rejected, (state, action) => {
      state.isLoading = false; 
      state.error = action.error.message;
    });
    builder.addCase(createRecipeHandlerAsync.pending, (state, action) => {
      state.isLoading = true;

    });
     builder.addCase(createRecipeHandlerAsync.fulfilled, (state, action) => {
      state.isLoading = false;      
    });
    builder.addCase(createRecipeHandlerAsync.rejected, (state, action) => {
      state.isLoading = false;

      state.error = action.error.message;
    });
    builder.addCase(updateRecipeHandlerAsync.pending, (state, action) => {
      state.isLoading = true;

    });
     builder.addCase(updateRecipeHandlerAsync.fulfilled, (state, action) => {
      state.isLoading = false;      
    });
    builder.addCase(updateRecipeHandlerAsync.rejected, (state, action) => {
      state.isLoading = false;

      state.error = action.error.message;
    });
    builder.addCase(deleteRecipeHandlerAsync.pending, (state, action) => {
      state.isLoading = true;

    });
     builder.addCase(deleteRecipeHandlerAsync.fulfilled, (state, action) => {
      state.isLoading = false;      
    });
    builder.addCase(deleteRecipeHandlerAsync.rejected, (state, action) => {
      state.isLoading = false;

      state.error = action.error.message;
    });
    
    

   
}
})
    
        
    
   
   
 export const {deleteRecipeHandler,deleteAllRecipe,favourateInAllRecipe,favourateInRecipeByUser,deleteUserRecipeHandler}=recipeSlice.actions; 
export default recipeSlice.reducer;