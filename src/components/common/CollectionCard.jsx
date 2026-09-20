import { Card, Typography, Button } from "antd";
import {
  FolderOpenOutlined,
  ArrowRightOutlined,
  CloseCircleFilled,
} from "@ant-design/icons";
import CustomModal from "../ui/CustomModal";
import { useState } from "react";
import ConfirMationToDelete from "./ConfirmationToDelete";
import { useDispatch } from "react-redux";
import { deleteCollectionHandler, removeFromCollectionAsync } from "../../feature/collectionSlice";
import toast from "react-hot-toast";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const { Title, Text } = Typography;

const CollectionCard = ({ collection,setCollectionModel ,editCollectionData}) => {
  const [collectionConfirm,setCollectionConfirm]=useState(false);
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const token=Cookies.get("token");
  const collectionDeleteHandler=async()=>{
   try {
     const res=await dispatch(removeFromCollectionAsync({id:collection.id,token})).unwrap();
     if(res.success){
      setCollectionConfirm(false)
      toast.success(res.message);
      dispatch(deleteCollectionHandler(collection.id))
     }
   } catch (error) {
   toast.error(error.message);
   }
    
  }


  const deleteCollectionConfirmHandler=()=>{

       setCollectionConfirm(true)

       
  }
  return (<div className="relative">
    <Card
      hoverable
      className="rounded-3xl overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all duration-300 group"
      bodyStyle={{ padding: 0 }}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={collection.image}
          alt={collection.name}
          className="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Recipe Count */}
       

        {/* Collection Name */}
        <div className="absolute bottom-6 left-6 text-white">
          <Title level={3} className="!text-white !mb-1">
            {collection.collectionName}
          </Title>

          <div className="flex items-center gap-2 text-gray-200">
            <FolderOpenOutlined />
            <span>Recipe Collection</span>
          </div>
        </div>
        
      </div>
    
      {/* Footer */}
      <div className="p-5 flex justify-between items-center">
        <Text className="text-gray-500">
          Explore all recipes
        </Text>

        <Button
          onClick={()=>{navigate(`/collection-recipe/${collection.id}`)}}
          type="primary"
          shape="circle"
          icon={<ArrowRightOutlined />}
          className="!bg-[#E63946] !border-[#E63946]"
        />
          <div onClick={()=>{setCollectionModel(true),editCollectionData(collection)}}  className=" bottom-15 -right-3 cursor-pointer"> 
                <MdModeEdit style={{fontSize:"24px" ,color:"#E63946"}} />
          </div>

      </div>
    </Card>
          <div  onClick={()=>{deleteCollectionConfirmHandler()}} className="absolute -top-3 -right-3 cursor-pointer"> 
                <CloseCircleFilled style={{fontSize:"24px" ,color:"#E63946"}} />
          </div>
       <CustomModal  setOpen={setCollectionConfirm} open={collectionConfirm} modalBody={<ConfirMationToDelete setConfirm={setCollectionConfirm} confirm={collectionConfirm}  deleteHandler={collectionDeleteHandler}  />}/>

        
    </div>
  );
};

export default CollectionCard;