import {
  Card,
  Avatar,
  Descriptions,
  Tag,
  Button,
  Space,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getAuthorByIdHandlerAsync } from "../../../feature/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../../constants/dateConverter";
import { FaArrowCircleLeft } from "react-icons/fa";

const AdminUserDetails = ({ user }) => {
    const {id}=useParams();
    const dispatch=useDispatch();
    const {authorsById}=useSelector(state=>state.user);
    const navigate=useNavigate();
    console.log(authorsById);
    
    const getUsersById=async()=>{
        try {
          const res=await  dispatch(getAuthorByIdHandlerAsync({id})).unwrap();
          console.log(res);
          
          
        } catch (error) {
          console.log(error);
          
        }
      }
    
    
      useEffect(()=>{
          getUsersById()
      },[])

  return (
    <Card className="shadow-md rounded-xl">
      <div className="cursor-pointer" onClick={()=>{navigate("/admin/users")}}> <FaArrowCircleLeft style={{fontSize:"20px",color:"#E63946"}} /></div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Left Section */}
        <div className="flex flex-col items-center w-full md:w-60">
          <Avatar
            size={120}
            src={authorsById?.profilePic}
            icon={<UserOutlined />}
          />

          <h2 className="text-2xl font-semibold mt-4">
            {authorsById?.name}
          </h2>

          <Tag
            color={authorsById?.role === "admin" ? "red" : "blue"}
            className="mt-2 capitalize"
          >
            {authorsById?.role}
          </Tag>

         
        </div>

        {/* Right Section */}
        <div className="flex-1 w-full">
          <Descriptions
            title="User Information"
            bordered
            column={1}
            size="middle"
          >
            <Descriptions.Item label="Name">
              {authorsById?.name}
            </Descriptions.Item>

            <Descriptions.Item label="Email">
              <Space>
                <MailOutlined />
                {authorsById?.email}
              </Space>
            </Descriptions.Item>

            <Descriptions.Item label="Mobile">
              <Space>
                <PhoneOutlined />
                {authorsById?.mobile || "-"}
              </Space>
            </Descriptions.Item>

            <Descriptions.Item label="Age">
              {authorsById?.age || "-"}
            </Descriptions.Item>

            <Descriptions.Item label="Date of Birth">
              <Space>
                <CalendarOutlined />
                {authorsById?.dob || "-"}
              </Space>
            </Descriptions.Item>

            <Descriptions.Item label="Gender">
              {authorsById?.gender || "-"}
            </Descriptions.Item>

            <Descriptions.Item label="Country">
              <Space>
                <EnvironmentOutlined />
                {authorsById?.country || "-"}
              </Space>
            </Descriptions.Item>

            <Descriptions.Item label="Role">
              <Tag color={authorsById?.role === "admin" ? "red" : "blue"}>
                {authorsById?.role}
              </Tag>
            </Descriptions.Item>

           
            <Descriptions.Item label="Created At">
              {formatDate(authorsById?.createdAt)}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    </Card>
  );
};

export default AdminUserDetails;