import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Image, Menu } from "antd";
import logo from "../assets/logo/logo.webp"
import CustomText from "../components/ui/CustomText";
import { useNavigate } from "react-router-dom";
const sideBarItems=[
            {
              key: "/admin/users",
              icon: <UserOutlined />,
              label: "Users Management",
              
            },
            {
              key: "/admin/recipes",
              icon: <VideoCameraOutlined />,
              label: 'Recipes Management',
            },
            
          ]
const Sidebar=()=>{
  const navigate=useNavigate();
    return(
        <>
         <div className="demo-logo-vertical flex justify-center py-5 " >
            <Image preview={false} className="!size-[50px] rounded-full" src={logo} />
         </div>

        <Menu
          theme=""
          mode="inline"
          defaultSelectedKeys={["/admin/users"]}
          items={sideBarItems}
          onClick={({key})=>{navigate(key)}}
        />
        </>
    )
}
export default Sidebar;