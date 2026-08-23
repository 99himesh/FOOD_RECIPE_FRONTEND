import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import logo from "../assets/logo/logo.webp";
import {Avatar, Badge, Image, Popover} from "antd";
import CustomButton from "../components/ui/CustomButton";
import CustomText from "../components/ui/CustomText";
import {
    AlignRightOutlined,
  CaretRightOutlined,
  CloseOutlined
} from '@ant-design/icons';
import { IoIosNotifications } from "react-icons/io";
import ProfileDropDown from "../components/common/profileDropdown";
import { useSelector } from "react-redux";
const Header =()=>{
        const [menuHeader,setMenuHeader]=useState(false);
    const {notificationCount}=useSelector(state=>state.notification);

        const [country,setCountry]=useState("India");
        const location=useLocation();
        const navigate=useNavigate();
        
      
    
    return(
        //   <div className=" w-full h-[120px] flex items-center z-50  ">
           <div className={`w-full h-[60px] flex items-center z-50 bg-[#E63946]`}>
           <nav className="container  max-md:mx-5 mx-auto flex justify-between items-center py-4 ">

                {/* Left Logo  */}
                <div className="md:order-1 order-2 flex items-center">
                    <Link to={"/"} className="text-2xl font-medium ">
                       <Image preview={false} className="!size-[40px] rounded-full object-cover" src={logo}/>
                    </Link>
                       

                </div>
                {/*  center navigation */}
                <div className="hidden xl:flex space-x-10 md:order-2 *:text-[#fff] *:text-[16px] *:hover:!bg-[#FF7A4D] *:px-3 *:py-1 *:rounded-full *:hover:text-[#fff]">
                     
                    <Link   to={"/"}>
                        Home
                    </Link>
                    <Link   to={"/recipe"}>
                        Recipe
                    </Link>
                    <Link to={"/authors"} >
                        Author
                    </Link>
                    <Link  to={"/favourate"} >
                        Favourate
                    </Link>
                    
                    <Link  to={"/collection"}>
                        Collection
                    </Link>
                   
                </div>

                {/* Right section */}
               
               <div className="order-2 flex gap-5 items-center">
               <div className="hidden sm:block md:order-3 order-2 !text-[#fff] cursor-pointer">
                <Popover trigger="click" placement="bottomRight"  content={<ProfileDropDown/>}>
                     <Avatar/>
                </Popover>
               </div>
               <div className="cursor-pointer" onClick={()=>{navigate("/notification")}}>
                <Badge count={notificationCount}>
                <IoIosNotifications  style={{fontSize:"24px",color:"#fff"}}/>
                </Badge>
               </div>
               </div>
               
               
                      
               <div    onClick={()=>{setMenuHeader(prev=>!prev)}} className="xl:hidden order-3 text-[#fff]">
                <AlignRightOutlined style={{color:"#000000",background:"#FF7A4D" ,fontSize:"24px" ,borderRadius:"5px",padding:"5px"}}/>
               </div>
            <div className={`fixed top-0 left-0 w-1/2 h-full bg-white shadow-lg transform transition-transform duration-1000  z-50 
                 ${menuHeader ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex justify-end p-4">
                    <button onClick={() => { setMenuHeader(false) }}>
                       <CloseOutlined style={{fontSize:"24px"}} /> 
                    </button>
                </div>
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-4 ">Menu</h2>
                    <nav className="flex flex-col space-y-4 *:text-gray-600 *:hover:text-black">
                         <Link   to={"/"}>
                        Home
                    </Link>
                           <Link   to={"/"}>
                        Recipe
                    </Link>
                    <Link  >
                        Author
                    </Link>
                    <Link  >
                        Favourate
                    </Link>
                    
                    <Link  >
                        Collection
                    </Link>
                    <Link  >
                        Profile
                    </Link>
                    </nav>
                </div>
            </div>
            </nav>
           
             
            {/* Mobile navigation */}
           
        </div>
    )
}
export default Header;