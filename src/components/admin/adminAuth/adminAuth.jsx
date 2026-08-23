import { Avatar, Button, Divider, Typography } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import toast from "react-hot-toast";
const { Title, Text } = Typography;

const AdminAuth = () => {
    const navigate=useNavigate();
    const logoutHandler=()=>{
      Cookies.remove("token");
      Cookies.remove("role");
      toast.success("Logout successfully")

      navigate("/login")
    }
  return (
    <div className="w-64">

      {/* User Info */}
       
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

export default AdminAuth;