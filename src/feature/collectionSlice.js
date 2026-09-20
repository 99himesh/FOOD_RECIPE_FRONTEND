import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../axios/axios"
const initialState = {
  isLoading:false,
  error:"",
  collection:[],
  recipeCollection:[]
};


export const crealteCollectionAsync = createAsyncThunk(
  "collection/creatCollection",
  async ({data,token}) => {
    
    try {
      const res = await api.post("collection/add", data,{
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

export const getCollectionAsync = createAsyncThunk(
  "collection/getCollection",
  async ({token}) => {
    
    try {
      const res = await api.get("collection/getCollection",{
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
export const removeFromCollectionAsync = createAsyncThunk(
  "collection/removeFromCollection",
  async ({id,token}) => {
    
    try {
      const res = await api.delete(`collection/deleteCollection/${id}`,{
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
export const updateCollectionAsync = createAsyncThunk(
  "collection/updateCollection",
  async ({id,data,token}) => {
    
    try {
      const res = await api.put(`collection/updateCollection/${id}`,data,{
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


export const getrecipeByCollectionIdAsync = createAsyncThunk(
  "collection/getrecipebyId",
  async ({data,token}) => {
    try {
      const res = await api.get("collectionRecipe/getCollectionRecipe",{
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

export const addToCollectionAsync = createAsyncThunk(
  "collection/addRecipe",
  async ({data,token}) => {
    try {
      const res = await api.post("collectionRecipe/add", data,{
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

export const recipeRemoveFromCollectionAsync = createAsyncThunk(
  "collection/removeRecipe",
  async ({data,id,token}) => {
    
    try {
      const res = await api.delete(`collectionRecipe/deleteCollectionRecipe/${id}`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
        },params:{
            ...data
        }
      });      
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);




export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    deleteCollectionHandler:(state,action)=>{
     const findIndex=state.collection.findIndex(item=>item.id==action.payload)
      state.collection.splice(findIndex,1)
    },
    createCollectionImmidiateHandler:(state,action)=>{
       state.collection=[action.payload,...state.collection]
    },
    editCollectionHandler:(state,action)=>{
     const findIndex=state.collection.findIndex(item=>item.id==action.payload.id)
      state.collection[findIndex]=action.payload.data
    },
    deleteFromCollection:(state,action)=>{
       const findIndex=state.recipeCollection?.recipeByCollection?.findIndex(item=>item?.RecipeId==action.payload);      
        state.recipeCollection?.recipeByCollection.splice(findIndex,1)
    },
    collectionRecipeFavourate:(state,action)=>{
       const findIndex=state.recipeCollection?.recipeByCollection?.findIndex(item=>item.RecipeId==action.payload);      
      state.recipeCollection.recipeByCollection[findIndex].Recipe.isFavourate=!state.recipeCollection.recipeByCollection[findIndex].Recipe.isFavourate;
    }


   
  },
  extraReducers: (builder) => {
    builder.addCase(crealteCollectionAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(crealteCollectionAsync.fulfilled, (state, action) => {
      state.isLoading = false;   
    });
    builder.addCase(crealteCollectionAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

     builder.addCase(getCollectionAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCollectionAsync.fulfilled, (state, action) => {
      state.isLoading = false; 
      state.collection=action.payload.collection;

    });
    builder.addCase(getCollectionAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.collection=[]
    });

     builder.addCase(removeFromCollectionAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeFromCollectionAsync.fulfilled, (state, action) => {
      state.isLoading = false; 

    });
    builder.addCase(removeFromCollectionAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateCollectionAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCollectionAsync.fulfilled, (state, action) => {
      state.isLoading = false; 

    });
    builder.addCase(updateCollectionAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
      builder.addCase(getrecipeByCollectionIdAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getrecipeByCollectionIdAsync.fulfilled, (state, action) => {
      state.isLoading = false; 
      state.recipeCollection=action.payload;

    });
    builder.addCase(getrecipeByCollectionIdAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
     builder.addCase(addToCollectionAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addToCollectionAsync.fulfilled, (state, action) => {
      state.isLoading = false; 

    });
    builder.addCase(addToCollectionAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(recipeRemoveFromCollectionAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(recipeRemoveFromCollectionAsync.fulfilled, (state, action) => {
      state.isLoading = false; 

    });
    builder.addCase(recipeRemoveFromCollectionAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    
    
        
    
   
   
   
  },
});
export const {deleteCollectionHandler,editCollectionHandler,deleteFromCollection,collectionRecipeFavourate}=collectionSlice.actions;
export default collectionSlice.reducer;