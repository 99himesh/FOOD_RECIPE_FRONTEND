import { Row, Col, Typography, Input, Button, Space, Avatar } from "antd";
import {
  SearchOutlined,
  RightOutlined,
  UserOutlined,
  FireOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;

const HeroBanner = ({home}) => {
  console.log(home);
  
  const navigate=useNavigate();
  return (
      <div className="container mx-auto max-sm:px-5 py-16 lg:py-24">
        <Row gutter={[48, 48]} align="middle">
          {/* Left Content */}
          <Col xs={24} lg={12}>
            <Space direction="vertical" size={24} className="w-full">
              {/* Badge */}
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-red-100 px-4 py-2">
                <FireOutlined className="text-[#E63946]" />
                <Text className="!text-[#E63946] !font-medium">
                  #1 Recipe Community
                </Text>
              </div>

              {/* Heading */}
              <Title
                level={1}
                className="!mb-0 !leading-tight !text-gray-900"
              >
                Discover Amazing
                <br />
                <span className="text-[#E63946]">Recipes</span> For Every Day
              </Title>

              {/* Description */}
              <Paragraph className="!text-lg !text-gray-600 !leading-8">
                Explore thousands of delicious recipes from professional chefs
                and home cooks. Save your favourites, create collections and
                start cooking today.
              </Paragraph>

              {/* Search */}
              {/* <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  size="large"
                  prefix={<SearchOutlined className="text-gray-400" />}
                  placeholder="Search recipes..."
                  className="!rounded-xl"
                />

                <Button
                  type="primary"
                  size="large"
                  className="!bg-[#E63946] !border-[#E63946] !rounded-xl"
                >
                  Search
                </Button>
              </div> */}

              {/* CTA Buttons */}
              <Space wrap size="middle">
                <Button
                onClick={()=>{navigate("/recipe")}}
                  type="primary"
                  size="large"
                  className="!bg-[#E63946] !border-[#E63946] !rounded-xl !px-8"
                >
                  Explore Recipes
                </Button>
{/* 
                <Button
                  size="large"
                  className="!rounded-xl !px-8"
                  icon={<RightOutlined />}
                >
                  Share Recipe
                </Button> */}
              </Space>

              {/* Statistics */}
              <Row gutter={[24, 24]} className="pt-6">
                <Col span={8}>
                  <Title level={2} className="!mb-0 !text-[#E63946]">
                    {home?.recipeCount>1?home?.recipeCount-1:home?.recipeCount}{home?.recipeCount>0 && "+"}
                  </Title>
                  <Text className="!text-gray-500">Recipes</Text>
                </Col>

               

                <Col span={8}>
                  <Title level={2} className="!mb-0 !text-[#E63946]">
                   {home?.userCount>1?home?.userCount-1:home?.userCount} {home?.userCount>0 && "+"}
                  </Title>
                  <Text className="!text-gray-500">Food Lovers</Text>
                </Col>
              </Row>
            </Space>
          </Col>

          {/* Right Image */}
          <Col xs={24} lg={12}>
            <div className="relative flex justify-center">
              {/* Main Image */}
              <img
                src={home?.recipe?.[0]?.image}
                alt="Healthy Food"
                className="w-full max-w-lg rounded-3xl shadow-2xl object-cover"
              />

              {/* Floating Card */}
              <div className="absolute -bottom-6 left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-4">
                <Avatar
                  size={52}
                  icon={<UserOutlined />}
                  className="!bg-[#E63946]"
                />

                <div>
                  <Text strong className="block">
                   Last created Recipe
                  </Text>

                  <Text className="text-gray-500">
                    {home?.recipe?.[0]?.title}
                  </Text>
                   
                </div>
              </div>

              {/* Floating Badge */}
             
            </div>
          </Col>
        </Row>
      </div>
  );
};

export default HeroBanner;