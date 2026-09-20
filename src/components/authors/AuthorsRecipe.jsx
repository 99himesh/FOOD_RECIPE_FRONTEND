import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Col,
  Empty,
  Input,
  Row,
  Statistic,
  Typography,
} from "antd";
import {
  SearchOutlined,
  UserOutlined,
  TeamOutlined,
  BookOutlined,
} from "@ant-design/icons";
import RecipeCard from "../common/RecipeCard";
import { getRecipeByUserIdHandlerAsync } from "../../feature/recipeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CustomPagination from "../ui/CustomPagination";
import Cookies from "js-cookie"

const { Title, Paragraph, Text } = Typography;




const AuthorRecipes = () => {
  const[page,setPage]=useState(1);
  const [search, setSearch] = useState("");
  const dispatch=useDispatch();
  const {recipesByUser}=useSelector(state=>state.recipe);
  const token=Cookies.get("token")
  const {id}=useParams();
    const getRecipeByUserIdHandler=async()=>{
        const data={page,limit:12,search}
        try {
          const res=await dispatch(getRecipeByUserIdHandlerAsync({id,data,token})).unwrap();
        } catch (error) {
         toast.error(error.message);
        }
      }
      useEffect(()=>{
        getRecipeByUserIdHandler();
      },[page,search])



  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Author Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-5 py-12">

          <Row gutter={[32, 32]} align="middle">

            <Col xs={24} md={6} className="text-center">
              <Avatar
                size={140}
                src={recipesByUser?.user?.profilePic}
                icon={<UserOutlined />}
                className="!bg-[#E63946]"
              />
            </Col>

            <Col xs={24} md={18}>

              <Title className="!mb-2">
                {recipesByUser?.user?.name}
              </Title>

              <Paragraph className="text-gray-500">
                {recipesByUser?.user?.email}
              </Paragraph>
              <div className="flex gap-10 flex-wrap">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-[#E63946]">
              {recipesByUser?.recipeCount || 0}
            </h3>
            <p className="text-gray-500">Recipes</p>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-[#E63946]">
              {recipesByUser?.followerCount || 0}
            </h3>
            <p className="text-gray-500">Followers</p>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-[#E63946]">
              {recipesByUser?.followingCount || 0}
            </h3>
            <p className="text-gray-500">Following</p>
          </div>
        </div>
            </Col>

             

          </Row>

        </div>
      </div>

      {/* Recipes */}
      <div className="container mx-auto px-5 py-10">

        <Row
          justify="space-between"
          align="middle"
          gutter={[16, 16]}
          className="mb-8"
        >

          <Col xs={24} md={12}>
            <Title level={3} className="!mb-0">
              All Recipes
            </Title>
          </Col>

          <Col xs={24} md={8}>
            <Input
              size="large"
              prefix={<SearchOutlined />}
              placeholder="Search recipes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>

        </Row>

        {recipesByUser?.recipe?.length ? (
          <Row gutter={[24, 24]}>
            {recipesByUser?.recipe?.map((recipe) => (
              <Col
                xs={24}
                sm={12}
                lg={8}
                xl={6}
                key={recipe.id}
              >
                <RecipeCard recipePage={"authors"} recipe={recipe} />
              </Col>
            ))}
          </Row>
        ) : (
          <Empty
            description="No recipes found"
            className="mt-20"
          />
        )}

      </div>
       <div className="pb-5">
          <CustomPagination pageSize={12} onchange={(e)=>{setPage(e)}}  pageNumber={page} total={recipesByUser?.recipeCount}/>
        </div>
    </div>
  );
};

export default AuthorRecipes;