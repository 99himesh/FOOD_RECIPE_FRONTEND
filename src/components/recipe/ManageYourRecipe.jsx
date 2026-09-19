import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Input,
  Button,
  Select,
  Empty,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../common/RecipeCard";
import { getRecipeByUserIdHandlerAsync } from "../../feature/recipeSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import CustomPagination from "../ui/CustomPagination";
const { Title, Paragraph } = Typography;
const ManageYourRecipe = () => {
  const[page,setPage]=useState(1);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const {recipesByUser}=useSelector(state=>state.recipe);
  const token=Cookies.get("token")
  
  const [search, setSearch] = useState("");
  const userId=Cookies.get("userId")


    const manageRecipeHandler=async()=>{
    const data={limit:12,page:page}
    try {
      const res=await dispatch(getRecipeByUserIdHandlerAsync({id:userId,data,token})).unwrap();
          
      
    } catch (error) {
      console.log(error);
      
    }
  }


  useEffect(()=>{
    manageRecipeHandler();
  },[dispatch,page])

  return (
    <div className="bg-gray-50 min-h-screen py-10">

      <div className="container mx-auto px-5">

        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

          <div>
            <Title level={2} className="!mb-1">
              Manage Your Recipes
            </Title>

            <Paragraph className="!text-gray-500">
              Create, edit and manage all your recipes.
            </Paragraph>
          </div>

          <Button
            type="primary"
            
            size="large"
            icon={<PlusOutlined />}
            className="!bg-[#E63946] !border-[#E63946] rounded-xl"
            onClick={() => navigate("/create-recipe")}
          >
            Create Recipe
          </Button>

        </div>

        {/* Search & Filter */}



        {/* Recipes */}

        {recipesByUser?.recipe?.length ? (
          <Row gutter={[24, 24]} className="pt-5">
            {recipesByUser?.recipe?.map((recipe) => (
              <Col
                xs={24}
                sm={12}
                lg={8}
                xl={6}
                key={recipe.id}
              >
                <RecipeCard
                recipePage={"manage"}
                  recipe={recipe}
                  showActions
                  manageRecipe={true}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <Empty
            description="No Recipes Found"
            className="mt-20"
          >
           
          </Empty>
        )}
        <div >
          <CustomPagination onchange={(e)=>{setPage(e)}}  pageNumber={page} total={recipesByUser?.recipeCount}/>
        </div>

      </div>

    </div>
  );
};

export default ManageYourRecipe;