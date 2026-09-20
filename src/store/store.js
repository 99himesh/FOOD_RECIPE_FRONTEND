import { configureStore } from '@reduxjs/toolkit';
import userReducer  from "../feature/userSlice.js";
import recipeReducer from "../feature/recipeSlice.js"
import favourateReducer from "../feature/favourateSlice.js"
import collectionReducer from "../feature/collectionSlice.js"
import notificationReducer from "../feature/notificationSlice.js"
import homeReducer from "../feature/homeSlice.js"
import createFoodReducer from "../feature/aiSlice.js"
export const store = configureStore({
  reducer: {
   user:userReducer,
   recipe:recipeReducer,
   favourate:favourateReducer,
   collection:collectionReducer,
   notification:notificationReducer,
   home:homeReducer,
   foodAi:createFoodReducer
  },
})