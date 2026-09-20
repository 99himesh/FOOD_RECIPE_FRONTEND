import { Layout, Row, Col, Typography, Input, Button, Space, Divider } from "antd";
import {
  FacebookFilled,
  InstagramFilled,
  TwitterCircleFilled,
  YoutubeFilled,
  SendOutlined,
} from "@ant-design/icons";

const { Footer: AntFooter } = Layout;
const { Title, Text, Link } = Typography;

const Footer = () => {
  return (
    <AntFooter className="!bg-gray-900 !px-0 !py-0">
      <div className="container  mx-auto max-sm:px-5 py-14">

        <Row gutter={[48, 40]}>

          {/* Brand */}
          <Col xs={24} md={12} lg={8}>
            <Title level={2} className="!text-white !mb-3">
              <span className="text-[#E63946]">Recipe</span>Book
            </Title>

            <Text className="!text-gray-400 leading-7">
              Discover delicious recipes from around the world.
              Share your creations, explore cuisines, and cook like a chef.
            </Text>

           
          </Col>

          {/* Quick Links */}
          <Col xs={12} md={6} lg={4}>
            <Title level={5} className="!text-white">
              Quick Links
            </Title>

            <div className="flex flex-col gap-3 mt-6">
              <Link href="/recipe" className="!text-gray-400 hover:!text-[#E63946]">
                Recipes
              </Link>

              <Link href="/authors" className="!text-gray-400 hover:!text-[#E63946]">
                Author
              </Link>

              <Link href="/favourate" className="!text-gray-400 hover:!text-[#E63946]">
                favourate
              </Link>

              <Link href="/collection" className="!text-gray-400 hover:!text-[#E63946]">
                collection
              </Link>
            </div>
          </Col>

          {/* Categories */}
          <Col xs={12} md={6} lg={4}>
            <Title level={5} className="!text-white">
             Categary
            </Title>

            <div className="flex flex-col gap-3 mt-6 text-gray-400">
              <span>🍕 Vegiterian</span>
              <span>🍛 Non-Vegetarian</span>
            </div>
          </Col>

          {/* Newsletter */}
          <Col xs={24} lg={8}>
            <Title level={5} className="!text-white">
              Newsletter
            </Title>

            <Text className="!text-gray-400 block mb-6">
              Subscribe and receive new recipes every week.
            </Text>

             <Space size="middle" className="mt-8">
              <Button
                shape="circle"
                type="text"
                className="!text-white hover:!text-[#E63946]"
                icon={<FacebookFilled />}
              />

              <Button
                shape="circle"
                type="text"
                className="!text-white hover:!text-[#E63946]"
                icon={<InstagramFilled />}
              />

              <Button
                shape="circle"
                type="text"
                className="!text-white hover:!text-[#E63946]"
                icon={<TwitterCircleFilled />}
              />

              <Button
                shape="circle"
                type="text"
                className="!text-white hover:!text-[#E63946]"
                icon={<YoutubeFilled />}
              />
            </Space>
          </Col>

        </Row>

        <Divider className="!border-gray-700 !my-10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-5">

          <Text className="!text-gray-500">
            © {new Date().getFullYear()} RecipeBook. All rights reserved.
          </Text>

          <Space size="large">
            <Link className="!text-gray-500 hover:!text-[#E63946]">
              Privacy Policy
            </Link>

            <Link className="!text-gray-500 hover:!text-[#E63946]">
              Terms & Conditions
            </Link>

            <Link className="!text-gray-500 hover:!text-[#E63946]">
              Cookies
            </Link>
          </Space>

        </div>

      </div>
    </AntFooter>
  );
};

export default Footer;