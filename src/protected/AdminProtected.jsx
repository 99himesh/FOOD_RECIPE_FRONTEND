import Cookies from "js-cookie"
import { Navigate } from "react-router-dom";

const AdminProtected=({children})=>{
     const token=Cookies.get("token");
     const role=Cookies.get("role")
  if (!token ) {
    return <Navigate to="/login" replace />;
  }
   if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};



export default AdminProtected;