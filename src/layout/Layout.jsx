import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";
import { notificationCountHandlerAsync } from "../feature/notificationSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
const Layout=()=>{
    const token=Cookies.get("token");

     const dispatch=useDispatch();
    
    
     const getNotificationCountHandler=async()=>{
            try {
              const res=await dispatch(notificationCountHandlerAsync({token})).unwrap();  
            } catch (error) {
              toast.error(error.message);
              
            }
          }
        
        
          useEffect(()=>{
            getNotificationCountHandler();
          },[]) 
    return(
        <div >
          <Header/>
          <Outlet/>
          <Footer/>
        </div>
    )
}
export default Layout;