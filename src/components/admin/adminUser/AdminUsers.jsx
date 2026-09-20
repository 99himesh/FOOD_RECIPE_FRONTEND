import { Button, Avatar, Tag, Space } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import CustomText from "../../ui/CustomText";
import CustomTable from "../../ui/CustomTable";
import {useDispatch, useSelector} from "react-redux"
import { blockedHandler, deleteUserHandler, deleteUserHandlerAsync, getAuthorHandlerAsync, updateUserHandler, updateUserHAndlerAsync } from "../../../feature/userSlice";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { formatDate } from "../../../constants/dateConverter";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../ui/CustomInput";
import { CiCirclePlus } from "react-icons/ci";
import CustomSelect from "../../ui/CustomSelect";
import { MdDelete } from "react-icons/md";
import {toast} from "react-hot-toast"
import CustomModal from "../../ui/CustomModal";
import ConfirMationToDelete from "../../common/ConfirmationToDelete";
import CustomPagination from "../../ui/CustomPagination";
import CustomRadio from "../../ui/CustomRadio";
import CustomSwitch from "../../ui/CustomSwitch";
import Cookies from "js-cookie"
const AdminUsers = () => {
  const dispatch=useDispatch();
  const {authors,error}=useSelector(state=>state.user);
  const [search,setSearch]=useState("");
  const navigate=useNavigate();
  const [confirm,setConfirm]=useState(false);
  const [deleteId,setDeleteId]=useState(null);
  const [page,setPage]=useState(1);
  const token=Cookies.get("token");
  const updateUserRoleHandler=async(e,id)=>{
    const data={role:e}
    try {  
    const res=await dispatch(updateUserHAndlerAsync({id,data,token})).unwrap();
      if(res.success){
        toast.success(res.message);
        dispatch(updateUserHandler({id,role:e}))
      }
      
    } catch (error) {
      toast.error(error.message);
       
    }
  }

  const deleteHandler=async()=>{
    try {
      const res=await dispatch(deleteUserHandlerAsync({id:deleteId,token})).unwrap();
     if(res.success){
      toast.success(res.message);
      setConfirm(false);
      dispatch(deleteUserHandler(deleteId))
     }
      
      
    } catch (error) {
      toast.error(error.message);
      
    }
  }
   const blockHandler=async(cheched,id)=>{
    const data={isBlock:cheched}
     try {
      const res=await dispatch(updateUserHAndlerAsync({id,data,token})).unwrap();
      if(res.success){
        toast.success(res.message);
        dispatch(blockedHandler({id:id,isBlock:cheched}))
      } 
     } catch (error) {
      toast.error(error.message); 
     }
      
     }
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width:"100px",
       render: (_, record) => (
        <div>
           {record.id}
        </div>
      ),
    },
    {
      title: "User",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar src={record.image}>
            {record.name?.charAt(0) ?? record?.profilePic}
          </Avatar>
          <span className="font-medium">{record?.name}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (_,record) => (
        <>
        {/* {record.role=="user" ? (<Tag color={record.role === "admin" ? "red" : "blue"}>
           {record?.role}
         </Tag>): */}
        <CustomSelect 
        onchange={(e,id)=>{updateUserRoleHandler(e,record?.id)}}
        className="w-[130px]"
         value={record?.role} 
         options={[
          {label:"User",value:"user"},
          {label:"Admin",value:"admin"},
        ]}/>
        </>
      ),
    },
    {
      title: "Date",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align:"center",
      width:150,
      render: (record) => (
         <CustomText value={formatDate(record)}/>
      ),
    },

    {
      title: "Blocked",
      dataIndex: "isBlock",
      key: "isBlock",
      align:"center",
      render: (_,record) => (
        <CustomSwitch checked={record?.isBlock} onchange={(checked)=>{blockHandler(checked,record?.id)}}/>
        //  <CustomText value={record?.isBlock?"Block":"Unblock"}/>
      ),
    },


     {
      title: "Action",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align:"center",
      width:"150px",
      render: (_,record) => (
        <div onClick={()=>{}} className="flex justify-center items-center gap-3 cursor-pointer">
           <div onClick={()=>{setConfirm(true),setDeleteId(record?.id)}}>
          <MdDelete  color="red"  style={{fontSize:"20px"}}  />

         </div>
         <div onClick={()=>{navigate(`/admin/users/${record?.id}`)}} className="flex justify-center cursor-pointer">
          <FaEye color="red" style={{fontSize:"20px"}} />
         </div>
        
         </div>
      ),
    },


   
  ];

 


  const getUsers=async()=>{
    try {
      const data={search,limit:10,page:page}
      const res=await  dispatch(getAuthorHandlerAsync({data,token})).unwrap();
    } catch (error) {
      toast.error(error.message);
    }
  }


  useEffect(()=>{
      getUsers()
  },[search,page])
  
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <CustomText
          value={"Users Management"}
          className="!text-[20px] font-[500] text-[#000] "
        />
         <div className="flex  items-center  gap-4">
        <CustomInput className={"!w-[250px] "} placeholder={"Search Recipe"} value={search} onchange={(e)=>{setSearch(e.target.value)}}/>
       
        </div>
       
      </div>

      {/* Table */}
      <CustomTable
        columns={columns}
        dataSource={authors?.result ?? []}
        scroll={{y:700}}
      />
      <div className="flex justify-center">
            <CustomPagination pageSize={10} pageNumber={page} onchange={(e)=>{setPage(e)}}  total={authors?.count} />
          </div>
           <CustomModal  setOpen={setConfirm} open={confirm} modalBody={<ConfirMationToDelete setConfirm={setConfirm} confirm={confirm}  deleteHandler={deleteHandler}  />}/>
</>
  );
};

export default AdminUsers;