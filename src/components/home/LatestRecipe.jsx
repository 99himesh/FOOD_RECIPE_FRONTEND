import { Row, Col, Card, Typography, Button, Tag, Rate, Empty } from "antd";
import {
  ClockCircleOutlined,
  HeartOutlined,
  FireOutlined,
} from "@ant-design/icons";
import RecipeCard from "../common/RecipeCard";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;


const LatestRecipes = ({recipe}) => {
  const navigate=useNavigate();
  return (
    <>
    <div className="py-20 ">
      <div className="container mx-auto max-sm:px-5">
        {/* Header */}
        <div className="text-center mb-14">
          <Tag
            color="#E63946"
            className="px-4 py-1 rounded-full text-sm font-medium"
          >
            Latest Recipes
          </Tag>

          <Title level={2} className="!mt-4 !mb-3">
            Fresh From Our Kitchen
          </Title>

          <Paragraph className="!text-gray-500 max-w-2xl mx-auto">
            Explore the newest recipes shared by our community. From quick
            breakfasts to delicious dinners, there's something for everyone.
          </Paragraph>
        </div>

        {/* Cards */}
        <Row gutter={[24, 24]}>
          {recipe?.map((recipe) => (
            <Col xs={24} sm={12} lg={8} key={recipe.id}>
             <RecipeCard recipe={recipe}/>
            </Col>
          ))}
        </Row>

        {/* View All */}
       {!recipe?.length?<Empty/>: <div className="text-center mt-14">
          <Button
          onClick={()=>{navigate("/recipe")}}
            size="large"
            className="!border-[#E63946] !text-[#E63946] hover:!bg-[#E63946] hover:!text-white px-8 h-11 rounded-xl"
          >
            View All Recipes
          </Button>
        </div>}
      </div>
    </div>
    </>
  );
};

export default LatestRecipes;