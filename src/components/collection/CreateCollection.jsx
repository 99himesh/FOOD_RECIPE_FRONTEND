import { Button, Form, Input, Upload, Card, Typography, Image } from "antd";
import { CloseCircleFilled, UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { uploadMediaHandlerAsync } from "../../feature/mediaSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {  crealteCollectionAsync, editCollectionHandler, updateCollectionAsync } from "../../feature/collectionSlice";
import CustomInput from "../ui/CustomInput";
import Cookies from "js-cookie";
const { Title } = Typography;

const CreateCollection = ({setCollectionModel,collectionInput,setCollectionInput,isEdit,getCollectionHandler}) => {
  const token=Cookies.get("token")
  const dispatch=useDispatch();
  const imageUploadHandler=async(e)=>{
     const formData=new FormData();
        formData.append("file",e.file)
        const form={file:e.file}
        try {
            const res=await dispatch(uploadMediaHandlerAsync({formData,token})).unwrap();
            console.log(res);
            if(res.success){
                toast.success(res.message);
                setCollectionInput({...collectionInput,image:res?.url})

            }
            
            
        } catch (error) {
            console.log(error);
            
        }
    
  }
  const createCollectionHandler=async()=>{
    const data={...collectionInput}
        try {
          let res;
          if(!isEdit){
           res=await dispatch(crealteCollectionAsync({data,token})).unwrap();
           if(res.success){
            // dispatch(createCollectionImmidiateHandler(collectionInput))
            getCollectionHandler()
           }
          }else{
           res=await dispatch(updateCollectionAsync({data,id:collectionInput?.id,token})).unwrap();
           if(res.success){
            dispatch(editCollectionHandler({id:collectionInput?.id,data:collectionInput}))
            
           }
          }
          
          if(res?.success){
            setCollectionModel(false)
            toast.success(res.message);
            
          }
        } catch (error) {
          console.log(error);
          
        }
  
  }

  return (
      <Card className="w-full max-w-lg rounded-2xl shadow-lg">
        <Title level={3} className="text-center !mb-6">
          Create Collection
        </Title>

       <div className="flex flex-col gap-3">
            <CustomInput
            name="collectionName"
            value={collectionInput.collectionName}
            onchange={(e)=>{setCollectionInput({...collectionInput,collectionName:e.target.value})}}
              placeholder="Enter collection name"
              size="large"
              className="rounded-lg"
            />
        <div>
          {/* Collection Image */}
         {collectionInput?.image ?
        (<div className="relative">

               <Image className="rounded-xl !w-[410px]" src={collectionInput?.image}/>
                <div className="absolute right-0 -top-2" onClick={()=>{setCollectionInput({...collectionInput,image:null})}}>
                  <CloseCircleFilled style={{fontSize:"24px" ,color:"#E63946"}} />
                </div>

         </div>)
         : <Form.Item
            name="image"
            valuePropName="fileList"
            getValueFromEvent={(e) =>
              Array.isArray(e) ? e : e?.fileList
            }
            rules={[
              {
                required: true,
                message: "Please upload collection image",
              },
            ]}
          >
            <Upload
            onChange={(e)=>{imageUploadHandler(e)}}
              beforeUpload={() => false}
              listType="picture-card"
              maxCount={1}
              
            >
              <div>
                <UploadOutlined className="text-xl" />
                <p className="mt-2">Upload</p>
              </div>
            </Upload>
          </Form.Item>
          
          }
          </div>

          {/* Submit */}
          <Form.Item className="mb-0">
            <Button
            onClick={()=>{createCollectionHandler()}}
              htmlType="submit"
              type="primary"
              size="large"
              className="w-full !bg-[#E53935] hover:!bg-[#D32F2F] !border-none rounded-lg"
            >
             {isEdit?"Update Collection": "Create Collection"}
            </Button>
          </Form.Item>
          </div>
      </Card>
  );
};

export default CreateCollection;