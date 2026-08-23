import {
  Avatar,
  Button,
  Card,
  Col,
  Row,
  Statistic,
  Tag,
  Typography,
} from "antd";
import {
  UserOutlined,
  EditOutlined,
  BookOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const UserProfileCard = ({ user, onEdit }) => {
  return (
    <Card
      bordered={false}
      className="rounded-3xl overflow-hidden shadow-lg"
      bodyStyle={{ padding: 0 }}
    >
      {/* Cover */}
      <div className="relative h-52 bg-gradient-to-r ">

        {/* Edit Button */}
        <div className="absolute top-5 right-5">
          <Button
            icon={<EditOutlined />}
            className="rounded-full"
            onClick={onEdit}
          >
            Edit Profile
          </Button>
        </div>

        {/* Avatar */}
        <div className="absolute left-1/2 -bottom-16 -translate-x-1/2">
          <Avatar
            size={130}
            src={user?.profilePic}
            icon={<UserOutlined />}
            className="border-4 border-white shadow-lg !bg-[#E63946]"
          />
        </div>
      </div>

      {/* Content */}
      <div className="pt-20 pb-8 px-8">

        {/* Name */}
        <div className="text-center">

          <Title level={2} className="!mb-1">
            {user?.name}
          </Title>

          <Tag color="#E63946" className="rounded-full px-4 py-1">
            {user?.role?.toUpperCase()}
          </Tag>

          <div className="mt-3">
            <Text className="text-gray-500">
              {user?.email}
            </Text>
          </div>

        </div>

        {/* Stats */}
        <Row gutter={[24, 24]} className="mt-10">

          <Col xs={24} sm={8}>
            <Card className="text-center rounded-2xl border-0 bg-red-50 shadow-sm">
              <BookOutlined className="text-2xl text-[#E63946] mb-2" />
              <Statistic value={25} />
              <Text className="text-gray-500">
                Recipes
              </Text>
            </Card>
          </Col>

          <Col xs={24} sm={8}>
            <Card className="text-center rounded-2xl border-0 bg-red-50 shadow-sm">
              <TeamOutlined className="text-2xl text-[#E63946] mb-2" />
              <Statistic value={520} />
              <Text className="text-gray-500">
                Followers
              </Text>
            </Card>
          </Col>

          <Col xs={24} sm={8}>
            <Card className="text-center rounded-2xl border-0 bg-red-50 shadow-sm">
              <TeamOutlined className="text-2xl text-[#E63946] mb-2" />
              <Statistic value={180} />
              <Text className="text-gray-500">
                Following
              </Text>
            </Card>
          </Col>

        </Row>
      </div>
    </Card>
  );
};

export default UserProfileCard;