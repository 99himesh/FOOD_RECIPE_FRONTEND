import {
  Row,
  Col,
  Input,
  Select,
  Button,
  Typography,
  Space,
  Empty,
} from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import RecipeCard from "../common/RecipeCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipeHandlerAsync } from "../../feature/recipeSlice.js";
import toast from "react-hot-toast";
import CustomPagination from "../ui/CustomPagination.jsx";
import CustomMultipleFilter from "../ui/CustumMultipleFilter.jsx";
import Cookies from "js-cookie";
const { Title, Paragraph } = Typography;

const Recipe = () => {
  const [page,setPage]=useState(1)
  const navigate=useNavigate();
  const [search, setSearch] = useState("");
   const dispatch=useDispatch();
   const [filter,setFilter]=useState("")
   const {recipes}=useSelector(state=>state.recipe);
   const token=Cookies.get("token")
  // Dummy data (Replace with API)
  const getRecipeHandler=async()=>{
    const data={page,limit:12,search,filter:filter[0]}
    try {
      const res=await dispatch(getAllRecipeHandlerAsync({data,token})).unwrap();
          
      
    } catch (error) {
      toast.error(error.message);
      
    }
  }


  useEffect(()=>{
    getRecipeHandler();
  },[page,search,filter])
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-6 py-14 text-center">
          <Title className="!mb-3">
            Explore <span className="text-[#E63946]">Recipes</span>
          </Title>

          <Paragraph className="!text-gray-500 max-w-2xl mx-auto">
            Discover thousands of delicious recipes from around the world.
            Search, filter, and cook your favorite meals.
          </Paragraph>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-6">

          <Row gutter={[16, 16]} align="middle">

            <Col xs={24} sm={24} md={16} lg={16} xl={16} xxl={16}>
            <div className="flex gap-4">
              <Input
                size="large"
                placeholder="Search recipes..."
                prefix={<SearchOutlined />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <CustomMultipleFilter 
              option={[
                {label:"Vegetarian",value:"Vegetarian"},
                {label:"Non-Vegetarian",value:"Non-Vegetarian"},

              ]}
              placeholder={"Filter recipe"}
              value={filter}
              onchange={(e)=>{setFilter(e)}}
              />
              </div>
            </Col>

            

           

           

           <Col xs={24} sm={24}  md={6} lg={12} xl={6} xxl={6} >
           <div className="flex flex-wrap gap-4">
         
                <Button
                onClick={()=>{navigate("/manage-your-recipe")}}

                  type="primary"
                  className="!bg-[#E63946] !border-[#E63946]"
                >
                  Manage Your Recipe
                </Button>
                </div>
           </Col>

          </Row>

        </div>
      </section>

      {/* Recipes */}
      <section className="container mx-auto max-sm:px-6 pb-16">

        <Row gutter={[24, 24]}>
          {recipes?.recipe?.length > 0 ? (
            recipes?.recipe?.map((recipe) => (
              <Col
                xs={24}
                sm={12}
                lg={8}
                xl={6}
                xxl={6}
                key={recipe.id}
              >
                <RecipeCard recipePage={"browse"} recipe={recipe} />
              </Col>
            ))
          ) : (
            <Col span={24}>
              <Empty description="No recipes found" />
            </Col>
          )}

          
        </Row>
        <div className="flex justify-center">
            <CustomPagination pageNumber={page} onchange={(e)=>{setPage(e)}}  total={recipes?.count} />
          </div>

      </section>
    </div>
  );
};

export default Recipe;