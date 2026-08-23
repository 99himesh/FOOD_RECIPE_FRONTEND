import {
  Card,
  Descriptions,
  Typography,
  Button,
  Tag,
} from "antd";
import { EditOutlined } from "@ant-design/icons";

const { Title } = Typography;

const PersonalInformation = ({ user, onEdit }) => {
  return (
    <Card
      bordered={false}
      className="rounded-3xl shadow-lg"
      extra={
        <Button
          type="primary"
          icon={<EditOutlined />}
          className="!bg-[#E63946] !border-[#E63946]"
          onClick={onEdit}
        >
          Edit
        </Button>
      }
    >
      <Title level={3} className="!mb-6">
        Personal Information
      </Title>

      <Descriptions
        bordered
        column={{
          xs: 1,
          sm: 1,
          md: 2,
        }}
      >
        <Descriptions.Item label="Full Name">
          {user?.name || "-"}
        </Descriptions.Item>

        <Descriptions.Item label="Email">
          {user?.email || "-"}
        </Descriptions.Item>

        <Descriptions.Item label="Mobile">
          {user?.mobile || "-"}
        </Descriptions.Item>

        <Descriptions.Item label="Age">
          {user?.age || "-"}
        </Descriptions.Item>

        <Descriptions.Item label="Date of Birth">
          {user?.dob || "-"}
        </Descriptions.Item>

        <Descriptions.Item label="Gender">
          {user?.gender || "-"}
        </Descriptions.Item>

        <Descriptions.Item label="Country">
          {user?.country || "-"}
        </Descriptions.Item>

        <Descriptions.Item label="Role">
          <Tag color="#E63946">
            {user?.role?.toUpperCase()}
          </Tag>
        </Descriptions.Item>

        <Descriptions.Item label="Member Since">
          {new Date(user?.createdAt).toLocaleDateString()}
        </Descriptions.Item>

        <Descriptions.Item label="Last Updated">
          {new Date(user?.updatedAt).toLocaleDateString()}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default PersonalInformation;