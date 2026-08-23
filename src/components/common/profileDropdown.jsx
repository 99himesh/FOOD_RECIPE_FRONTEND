import { Avatar, Button, Divider, Typography } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import toast from "react-hot-toast";
const { Title, Text } = Typography;

const ProfileDropDown = ({ user }) => {
    const navigate=useNavigate();
    const logoutHandler=()=>{
      Cookies.remove("token");
      Cookies.remove("role");
      toast.success("Logout successfully")

      navigate("/login")
    }

    const name=Cookies.get("userName")
  return (
    <div className="w-64">

      {/* User Info */}
      <div className="flex items-center gap-3">
        <Avatar
          size={50}
          src={user?.profilePic}
          icon={<UserOutlined />}
          className="!bg-[#E63946]"
        />

        <div>
          <Title level={5} className="!mb-0">
            {name || "John Doe"}
          </Title>

          {/* <Text className="text-gray-500 text-sm">
            {user?.email || "john@example.com"}
          </Text> */}
        </div>
      </div>

      <Divider className="!my-4" />

      {/* Buttons */}
      {/* <Button
        onClick={()=>{navigate("/profile")}}
        block
        size="large"
        icon={<UserOutlined />}
        className="!mb-3 text-left"
      >
        My Profile
      </Button> */}

      <Button
      onClick={()=>{logoutHandler()}}
        block
        danger
        size="large"
        icon={<LogoutOutlined />}
      >
        Logout
      </Button>

    </div>
  );
};

export default ProfileDropDown;