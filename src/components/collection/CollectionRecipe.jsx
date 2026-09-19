import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Input,
  Row,
  Statistic,
  Tag,
  Typography,
} from "antd";
import {
  SearchOutlined,
  BookOutlined,
  HeartOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import RecipeCard from "../common/RecipeCard";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addToCollectionAsync, getrecipeByCollectionIdAsync } from "../../feature/collectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllRecipe, getAllRecipeHandlerAsync } from "../../feature/recipeSlice";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
const { Title, Paragraph, Text } = Typography;




const CollectionRecipes = () => {
  const {id}=useParams();
  const [search,setSearch]=useState("")
  const dispatch=useDispatch();
  const {recipeCollection}=useSelector(state=>state.collection)
  const {recipes}=useSelector(state=>state.recipe);
  const token=Cookies.get("token")
  console.log(recipes,"recipe");
  
console.log(recipeCollection.recipeByCollection);



   const getRecipeCollectionHandler=async()=>{
        const data={CollectionId:id}
        try {
          const res=await dispatch(getrecipeByCollectionIdAsync({data,token})).unwrap();
          console.log(res); 
        } catch (error) {
          console.log(error);
          
        }
      }
  



    const getRecipeHandler=async()=>{
      const data={search:search}
      try {
        const res=await dispatch(getAllRecipeHandlerAsync({data,token})).unwrap();
      } catch (error) {
        console.log(error);
        
      }
    }
  
    const addToCollectionHandler=async(id)=>{
      console.log(id);
      const data={CollectionId:recipeCollection?.collection?.id,RecipeId:id}
       try {
        const res=await dispatch(addToCollectionAsync({data,token})).unwrap();
        if(res?.success){
          toast.success(res.message);
          dispatch(deleteAllRecipe())
          getRecipeCollectionHandler()
        }
      } catch (error) {
        console.log(error);
         toast.error(error.message)
        
      }
      
    }
  
    useEffect(()=>{
      if(search){
      getRecipeHandler();

      }
       
    },[search])
     
    
      useEffect(()=>{
        getRecipeCollectionHandler();
      },[id])
  
  return (
    <div className="bg-gray-50 min-h-screen relative">

      {/* Cover Image */}
      <div
        className="h-80 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${recipeCollection?.collection?.image})`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex items-center justify-center">
          <Title className="!text-white !mb-0 text-center">
            {recipeCollection?.collection?.collectionName}
          </Title>
        </div>
      </div>
      <div className="absolute top-10 right-10">
            <Input
            className="!w-[400px]"
              onChange={(e)=>{setSearch(e.target.value)}}
              value={search}
              size="large"
              placeholder="Search recipes..."
              prefix={<SearchOutlined />}
            />
            <div className="!max-h-[300px] overflow-auto">
            <div className="z-10  w-full flex flex-col gap-2 pt-2 ">
                 {recipes?.recipe?.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition "
                >
                  {/* Image */}
                  <div className="flex gap-5 items-center px-3 ">
                  <img
                    src={item.image}
                    alt={item.title}
                    className=" size-[100px] rounded-xl  object-cover"
                  />

                  {/* Content */}
                  <div className="p-4">
                    <h2 className="text-xl font-semibold">{item.title}</h2>

                    <p className="text-gray-600 mt-2 line-clamp-2">
                      {item.description}
                    </p>

                    <Button onClick={()=>{addToCollectionHandler(item.id)}} className="mt-4 bg-[#E53935] text-white px-4 py-2 rounded-lg hover:bg-[#d32f2f]">
                      Add to Collection
                    </Button>
                  </div>
                  </div>
                </div>
              ))}
            </div>
            </div>
            </div>
      <div className="container mx-auto px-5 py-10">

        {/* Collection Info */}

       

        {/* Search */}

        <Row
          justify="space-between"
          align="middle"
          className="mt-10 mb-8"
          gutter={[16, 16]}
        >

          <Col>
            <Title level={3}>
              Recipes in this Collection
            </Title>
          </Col>

        

        </Row>

        {/* Recipes */}
         {recipeCollection?.recipeByCollection.length==0 && <Empty/>}
        <Row gutter={[24, 24]}>
          {recipeCollection?.recipeByCollection?.map((item) => (
            <Col
              xs={24}
              sm={12}
              lg={8}
              xl={6}
              key={item}
            >
              <RecipeCard recipePage={"collection"} collection={recipeCollection?.collection?.id} recipe={item.Recipe}  />
            </Col>
          ))}

        </Row>

      </div>

    </div>
  );
};

export default CollectionRecipes;