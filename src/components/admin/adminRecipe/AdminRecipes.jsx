import { Button, Avatar, Tag, Space } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import CustomText from "../../ui/CustomText";
import CustomTable from "../../ui/CustomTable";
import {useDispatch, useSelector} from "react-redux"
import { getAuthorHandlerAsync } from "../../../feature/userSlice";
import { useEffect } from "react";
import { FaEye, FaPencilAlt, FaPlusCircle } from "react-icons/fa";
import { formatDate } from "../../../constants/dateConverter";
import { useNavigate } from "react-router-dom";
import { deleteRecipeHandler, deleteRecipeHandlerAsync, getAllRecipeHandlerAsync } from "../../../feature/recipeSlice";
import CustomPagination from "../../ui/CustomPagination";
import { useState } from "react";
import CustomInput from "../../ui/CustomInput";
import { CiCirclePlus } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import {toast} from "react-hot-toast"
import CustomModal from "../../ui/CustomModal";
import ConfirMationToDelete from "../../common/ConfirmationToDelete";
const AdminRecipe = () => {
  const [page,setPage]=useState(1);
  const [search,setSearch]=useState("")
  const dispatch=useDispatch();
  const {recipes}=useSelector(state=>state.recipe);  
  const navigate=useNavigate();
  const [confirm,setConfirm]=useState(false)
  const [deleteId,setDeleteId]=useState(null)
  const adminRecipeDeleteHandler=async()=>{
    try {
      const res=await dispatch(deleteRecipeHandlerAsync({id:deleteId})).unwrap();
      if(res?.success){
        toast.success(res?.message);
        dispatch(deleteRecipeHandler(deleteId));
        setConfirm(false);
      }
    } catch (error) {
      console.log(error);
      
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
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar src={record.image}>
            {record.title?.charAt(0) ?? record?.image}
          </Avatar>
          <span className="font-medium">{record?.title}</span>
        </div>
      ),
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "cookingTime",
      dataIndex: "cookingTime",
      key: "cookingTime",
       render: (_,record) => (
           <CustomText value={`${record.cookingTime} min`}/>
      ),
    },
    {
      title: "Servings",
      dataIndex: "servings",
      key: "servings",
       render: (_,record) => (
           <CustomText value={`${record.servings}`}/>
      ),
    },
    {
      title: "Diet Type",
      dataIndex: "dietType",
      key: "dietType",
       render: (_,record) => (
           <CustomText value={`${record.dietType}`}/>
      ),
    },
    
    {
      title: "Date",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align:"center",
      render: (record) => (
         <CustomText value={formatDate(record)}/>
      ),
    },


     {
      title: "Action",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align:"center",
      width:"150px",
      render: (_,record) => (
         <div  className="flex justify-center items-center gap-2 cursor-pointer">
        
        <div  onClick={()=>{navigate("/admin/create-recipes ", {
                        state: {
                          recipe:record,
                          isEdit: true,
                        },
                      }
                    )}}><FaPencilAlt  style={{fontSize:"16px"}}/></div> 
         <div  onClick={()=>{setConfirm(true),setDeleteId(record?.id)}}><MdDelete style={{fontSize:"16px"}} /></div>
          <div onClick={()=>{navigate(`/admin/recipes/${record?.id}`)}}><FaEye style={{fontSize:"16px"}} /></div>
         </div>
      ),
    },


   
  ];

 


  const getAllRecipeHandler=async()=>{
    try {
      const data={page:page,limit:10,search}
      const res=await  dispatch(getAllRecipeHandlerAsync({data})).unwrap();
      console.log(res);
      
      
    } catch (error) {
      console.log(error);
      
    }
  }


  useEffect(()=>{
      getAllRecipeHandler()
  },[page,search])
  
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <CustomText
          value={"Recipe Management"}
          className="!text-[20px] font-[500] text-[#000] "
        />
         <div className="flex  items-center  gap-4">
        <CustomInput className={"!w-[250px] "} placeholder={"Search Recipe"} value={search} onchange={(e)=>{setSearch(e.target.value)}}/>
        <div className="cursor-pointer" onClick={()=>{navigate("/admin/create-recipes")}}>
        <CiCirclePlus color="red" style={{fontSize:"30px"}}  />
        </div>
       </div>
      
       
      </div>

      {/* Table */}
      <CustomTable
        columns={columns}
        dataSource={recipes?.recipe ?? []}
        pagination={{ pageSize: 10 }}
      />
        <div className="flex justify-center">
            <CustomPagination pageNumber={page} onchange={(e)=>{setPage(e)}}  total={recipes?.count} />
          </div>

           <CustomModal  setOpen={setConfirm} open={confirm} modalBody={<ConfirMationToDelete setConfirm={setConfirm} confirm={confirm}  deleteHandler={adminRecipeDeleteHandler}  />}/>

    </div>
  );
};

export default AdminRecipe;