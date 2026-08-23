import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";
import { notificationCountHandlerAsync } from "../feature/notificationSlice";
import { useDispatch, useSelector } from "react-redux";

const Layout=()=>{
    

     const dispatch=useDispatch();
    
    
     const getNotificationCountHandler=async()=>{
            try {
              const res=await dispatch(notificationCountHandlerAsync({})).unwrap();
                  
              console.log(res);
              
            } catch (error) {
              console.log(error);
              
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