import { useEffect, useState } from "react";
import {
  Typography,
  Row,
  Col,
  Input,
  Select,
  Empty,
  Button,
} from "antd";
import {
  HeartFilled,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import RecipeCard from "../common/RecipeCard";
import { getFavourateHandlerAsync } from "../../feature/favourateSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
const { Title, Paragraph } = Typography;


const Favourite = () => {
  const [search, setSearch] = useState("");
  const dispatch=useDispatch();
  const {favourate}=useSelector(state=>state.favourate);
  const token=Cookies.get("token");
console.log(favourate);

    const getFavourateHandler=async()=>{
        try {
          const res=await dispatch(getFavourateHandlerAsync({token})).unwrap();
              
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
    
      useEffect(()=>{
        getFavourateHandler();
      },[])

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-6 py-14 text-center">

          <div className="inline-flex items-center gap-2 bg-red-100 text-[#E63946] px-5 py-2 rounded-full font-medium">
            <HeartFilled />
            My Favourite Recipes
          </div>

          <Title className="!mt-6">
            Recipes You <span className="text-[#E63946]">Love</span>
          </Title>

          <Paragraph className="!text-gray-500 max-w-2xl mx-auto">
            All your saved recipes in one place. Cook them anytime, anywhere.
          </Paragraph>

        </div>
      </section>

      {/* Search */}
      <section className="container mx-auto px-6 py-8">

       

        {/* Recipe Grid */}

        {favourate?.length ? (
          <Row gutter={[24, 24]}>
            {favourate?.map((recipe) => {
              console.log("sfshbjh");
              
              const recipeItem={...recipe.Recipe,isFavourate:true};
              console.log(recipeItem,"recipeItem");
              
                return(
                <>
            
              <Col
                xs={24}
                sm={12}
                lg={8}
                xl={6}
                key={recipe.id}
              >
                <div className="relative">
                  <RecipeCard recipePage={"favourate"} recipe={recipeItem} />
                </div>
              </Col>
              </>
                )
            })}
          </Row>)
          : (
          <Empty
            className="mt-20"
            description="No Favourite Recipes Found"
          />
        )}

      </section>
    </div>
  );
};

export default Favourite;