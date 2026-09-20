import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Image,
  List,
  Rate,
  Row,
  Space,
  Tag,
} from "antd";
import {
  ClockCircleOutlined,
  FireOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRecipeByIdHandlerAsync } from "../../../feature/recipeSlice";
import { FaArrowCircleLeft } from "react-icons/fa";
import Cookies from "js-cookie";


const AdminRecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { recipe } = useSelector(state => state.recipe);
  const token = Cookies.get("token");

  const getRecipeByIdHandler = async () => {
    try {
      const res = await dispatch(getRecipeByIdHandlerAsync({ id, token })).unwrap();
    } catch (error) {
      toast.error(error.message);
    }
  }


  useEffect(() => {
    getRecipeByIdHandler()
  }, [])
  return (
    <>
      <div className="cursor-pointer" onClick={() => { navigate("/admin/recipes") }}> <FaArrowCircleLeft style={{ fontSize: "20px", color: "#E63946" }} /></div>
      <div className="max-w-7xl mx-auto p-6">
        <Card className="rounded-xl shadow-lg">
          <Row gutter={[40, 40]}>
            {/* Left */}
            <Col xs={24} lg={12}>
              <Image
                src={recipe?.image}
                className="rounded-xl object-cover"
                width="100%"
              />
            </Col>
            {/* Right */}
            <Col xs={24} lg={12}>
              <Space direction="vertical" size="large" className="w-full">
                <div>
                  <h1 className="text-4xl font-bold">
                    {recipe?.title}
                  </h1>

                  <p className="text-gray-500 mt-3">
                    {recipe?.description}
                  </p>
                </div>

                <Space wrap>

                  <Tag color={recipe?.dietType != "Non-Vegetarian" ? "green" : "red"}>{recipe?.dietType}</Tag>

                  <Tag icon={<ClockCircleOutlined />}>
                    {recipe?.cookingTime} min
                  </Tag>


                  <Tag>{recipe?.servings} Servings</Tag>
                </Space>

                <div className="flex items-center gap-3">


                  <div>
                    <p className="font-semibold">
                      created by {recipe?.User?.name}
                    </p>


                  </div>
                  <Rate
                    disabled
                    allowHalf
                    value={recipe?.rate}
                  />
                </div>
                <div className="h-[200px] overflow-auto">

                  {recipe?.RateReviews?.length > 0 ? (
                    recipe.RateReviews.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex gap-3 p-4 border-b border-gray-200 "
                      >
                        <Avatar
                          src={item.User?.name}
                          alt={item.User?.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />

                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{item.User?.name}</h4>

                          </div>

                          <p className="text-gray-600 mt-1">
                            {item.review}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No reviews yet.
                    </p>
                  )}

                </div>


              </Space>
            </Col>
          </Row>

          <Divider />

          <Row gutter={40}>
            {/* Ingredients */}
            {/* <Col xs={24} lg={10}>
            <Card title="Ingredients">
              <List
                dataSource={recipe.ingredients}
                renderItem={(item) => (
                  <List.Item>• {item}</List.Item>
                )}
              />
            </Card>
          </Col> */}

            {/* Instructions */}
            <Col xs={24} lg={14}>
              <Card title="Instructions">

                <div>

                  <p className="text-gray-600 mt-1">
                    {recipe?.instructions}
                  </p>
                </div>

              </Card>
            </Col>
          </Row>
        </Card>
      </div>
    </>

  );
};

export default AdminRecipeDetails;