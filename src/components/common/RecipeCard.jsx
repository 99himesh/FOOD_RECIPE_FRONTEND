import { Row, Col, Card, Typography, Button, Tag, Rate } from "antd";
import {
  ClockCircleOutlined,
  HeartOutlined,
  FireOutlined,
  CloseOutlined,
  CloseCircleFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import CustomText from "../ui/CustomText";
import CustomModal from "../ui/CustomModal";
import { useState } from "react";
import ConfirMationToDelete from "./ConfirmationToDelete";
import { deleteRecipeHandler, deleteRecipeHandlerAsync, deleteUserRecipeHandler, favourateInAllRecipe, favourateInRecipeByUser } from "../../feature/recipeSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { addToFavourateHandlerAsync, removeFromFavourate, removeFromFavourateHandlerAsync } from "../../feature/favourateSlice";
import { collectionRecipeFavourate, deleteFromCollection, recipeRemoveFromCollectionAsync } from "../../feature/collectionSlice";
const { Title, Paragraph, Text } = Typography;
import Cookies from "js-cookie";
const RecipeCard=({recipe,manageRecipe,collection,recipePage})=>{  
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [confirm,setConfirm]=useState(false)
 const token=Cookies.get("token");

  const recipeDeleteHandler=async()=>{
     try {
           let res;
           if(manageRecipe){
            res=await dispatch(deleteRecipeHandlerAsync({id:recipe.id,token})).unwrap();

           }else{
            const data={RecipeId:recipe.id}
            res=await dispatch(recipeRemoveFromCollectionAsync({id:collection,data,token})).unwrap();
            dispatch(deleteFromCollection(recipe.id))
           }
          if(res.success){
            toast.success(res.message);
            dispatch(deleteUserRecipeHandler(recipe.id))
            setConfirm(false)
          }
     } catch (error) {
       toast.error(error.message);
     }
  }

  const favourateHandler=async()=>{
    try {
      const data={recipeId:recipe?.id}

      if(!recipe?.isFavourate ){
         const res=await dispatch(addToFavourateHandlerAsync({data,token})).unwrap();
         if(res.success){
          toast.success(res.message);
         if(recipePage=="browse"){
          dispatch(favourateInAllRecipe(recipe.id))
         }
         if(recipePage=="manage" || recipePage=="authors"){
          dispatch(favourateInRecipeByUser(recipe.id))

         }
         if(recipePage=="collection"){
          dispatch(collectionRecipeFavourate(recipe.id))


         }
         }
      }else{
        const res=await dispatch(removeFromFavourateHandlerAsync({id:recipe?.id,token})).unwrap();
         if(res.success){
          toast.success(res.message);
         if(recipePage=="browse"){
          dispatch(favourateInAllRecipe(recipe.id))
         }
         if(recipePage=="manage" || recipePage=="authors"){
          dispatch(favourateInRecipeByUser(recipe.id))
          
         } 
         if(recipePage=="favourate"){
          dispatch(removeFromFavourate(recipe?.id))
         }
         if(recipePage=="collection"){
          dispatch(collectionRecipeFavourate(recipe.id))
          
         }
         }
      }
      
    } catch (error) {
     toast.error(error.message);
      
    }
  }
  
    return(
        < div className="relative">
         <Card
                hoverable
                className="  rounded-2xl overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300"
                cover={
                  <div className="relative ">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="h-60 w-full object-cover hover:scale-110 transition duration-500"
                    />

                   
                   <div className="absolute top-1 right-0">
                     <div onClick={()=>{favourateHandler()}} className="absolute top-3 right-3 size-[30px] flex justify-center items-center  rounded-full bg-[#fff]">
                     {!recipe.isFavourate?( <MdFavoriteBorder  style={{fontSize:"24px",color:"red"}}/>):
                     ( <MdOutlineFavorite style={{fontSize:"24px",color:"red"}} />)}
                      </div>
                     
                    </div>
                  </div>
                }
              >
                <Title level={4}>{recipe.title}</Title>
                  
                {/* <Rate
                  disabled
                  allowHalf
                  defaultValue={recipe.rating}
                  className="text-sm"
                /> */}



                <div className="flex justify-between items-center mt-5 text-gray-500">
                  <div className="flex items-center gap-2">
                    <ClockCircleOutlined />
                    <Text>{`${recipe.cookingTime} min`}</Text>
                  </div>

                  <div className="flex items-center gap-2">
                    <FireOutlined className="text-[#E63946]" />
                    <Text>{`${recipe.dietType}`}</Text>
                  </div>
                </div>

                <Button
                onClick={()=>{navigate(`/recipe-details/${recipe?.id}`)}}
                  type="primary"
                  block
                  className="!mt-6 !bg-[#E63946] !border-[#E63946] !h-11 rounded-xl"
                >
                  View Recipe
                </Button>
                {manageRecipe && 
                <Button
                   onClick={()=>{navigate("/create-recipe", {
                        state: {
                          recipe:recipe,
                          isEdit: true,
                        },
                      }
                    )}}
                  type="primary"
                  block
                  className="!mt-6  !bg-[#fff] !border-[#E63946] !text-[#E63946] !h-11 rounded-xl"
                >
                  Edit Recipe
                </Button>}
               
              </Card>
               {manageRecipe &&
                <div onClick={()=>{setConfirm(true)}} className="absolute -top-3 -right-3 cursor-pointer"> 
                <CloseCircleFilled style={{fontSize:"24px" ,color:"#E63946"}} />
                </div>
                }
                {collection &&
                <div onClick={()=>{setConfirm(true)}} className="absolute -top-3 -right-3 cursor-pointer"> 
                <CloseCircleFilled style={{fontSize:"24px" ,color:"#E63946"}} />
                </div>
                }
                <CustomModal  setOpen={setConfirm} open={confirm} modalBody={<ConfirMationToDelete setConfirm={setConfirm} confirm={confirm}  deleteHandler={recipeDeleteHandler}  />}/>
        </div>
    )
}
export default RecipeCard;