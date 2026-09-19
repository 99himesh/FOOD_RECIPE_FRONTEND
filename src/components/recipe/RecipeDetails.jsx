import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  List,
  Rate,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";

import {
  ClockCircleOutlined,
  FireOutlined,
  HeartOutlined,
  ShareAltOutlined,
  FolderAddOutlined,
  UserOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import RecipeCard from "../common/RecipeCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeByIdHandlerAsync } from "../../feature/recipeSlice";
import { useEffect } from "react";
import CustomInput from "../ui/CustomInput";
import RecipeRate from "./RecipeRate";
import Review from "./Review";
import Cookies from "js-cookie";

const { Title, Paragraph, Text } = Typography;

const RecipeDetail = () => {
  const {id}=useParams();
  const dispatch=useDispatch();
  const {recipe}=useSelector(state=>state.recipe)
  const token=Cookies.get("token");
  

  const getRecipeByIdHandler=async()=>{
      try {
        const res=await dispatch(getRecipeByIdHandlerAsync({id,token})).unwrap();
            
        
      } catch (error) {
        console.log(error);
        
      }
    }
  
  
    useEffect(()=>{
      getRecipeByIdHandler();
    },[id])
  return (
    <div className="bg-gray-50">

      {/* Hero */}
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-[450px] object-cover"
      />

      <div className="container mx-auto py-10 px-5">

        <Row gutter={40}>

          {/* Left */}

          <Col xs={24} lg={16}>

            <Title>{recipe.title}</Title>

            <Space wrap className="mb-5">

              <Tag color="#E63946">
                {/* ⭐ {recipe.rating} */}
              </Tag>

              <Tag icon={<ClockCircleOutlined />}>
                {recipe.cookingTime} mins
              </Tag>

              <Tag>
                🍽 {recipe.servings} Servings
              </Tag>

              <Tag color="green">
                {recipe.dietType}
              </Tag>

            </Space>

            <div className="flex items-center gap-3 mb-8">

              <Avatar
                size={45}
                icon={<UserOutlined />}
              />

              <div>
                <Text strong>{recipe?.User?.name}</Text>
                <br />
                <Text type="secondary">
                  Recipe Creator
                </Text>
              </div>

            </div>

            <Paragraph className="text-lg leading-8">
              {recipe.description}
            </Paragraph>

            <Divider />

           
            <Title level={3}>
              Instructions
            </Title>

           <CustomInput value={recipe.instructions}/>
           <Divider/>
          <RecipeRate recipe={recipe} id={id} getRecipeByIdHandler={getRecipeByIdHandler}/>
          </Col>

          {/* Right */}
          <Col xs={24} lg={8}>
          <Rate disabled value={recipe.rate}/>
            <Card className="rounded-3xl sticky top-24">

              {/* <Button
                icon={<HeartOutlined />}
                block
                size="large"
                className="mb-4"
              >
                Save Recipe
              </Button>

              <Button
                icon={<FolderAddOutlined />}
                block
                size="large"
                className="mb-4"
              >
                Add To Collection
              </Button> */}

             

              <Space
                direction="vertical"
                size="large"
                className="w-full"
              >

                <div className="flex justify-between">
                  <Text>Cooking Time</Text>
                  <Text strong>{recipe.cookingTime} min</Text>
                </div>

                <div className="flex justify-between">
                  <Text>Servings</Text>
                  <Text strong>{recipe.servings}</Text>
                </div>


              

              </Space>

            </Card>

          </Col>

        </Row>

      
       

      </div>

    </div>
  );
};

export default RecipeDetail;