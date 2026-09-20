import {
    Card,
    Row,
    Col,
    Typography,
    Form,
    Button,
    Select,
    Upload,
    Divider,
    Image,
} from "antd";
import {
    PlusOutlined,
    UploadOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import CustomInput from "../ui/CustomInput";
import TextArea from "antd/es/input/TextArea";
import { uploadMediaHandlerAsync } from "../../feature/mediaSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import CustomSelect from "../ui/CustomSelect";
import {  createRecipeHandlerAsync, updateRecipeHandlerAsync } from "../../feature/recipeSlice";
import {useLocation, useNavigate} from "react-router-dom"
const { Title } = Typography;
import Cookies from "js-cookie";
const CreateRecipe = ({isEdit}) => {
    const dispatch=useDispatch();
    const location = useLocation();
    const navigate=useNavigate()
    const token=Cookies.get("token");
    const [recipeInput,setRecipeInput]=useState({     
                title: "",
                description: "",
                instructions:"",
                cookingTime: null,
                servings: null,
                dietType: "Vegetarian",
                image: "",
         });         

   const recipeInputHandler=(e)=>{    
    const {name,value}=e.target;
    if(name=="servings" || name=="cookingTime"){
      setRecipeInput({...recipeInput,[name]:Number(value)})    
         
    }else{
      setRecipeInput({...recipeInput,[name]:value})    

    }
    
   }
    const mediaUploadHandler=async(e)=>{

        const formData=new FormData();
        formData.append("file",e.file)
        const form={file:e.file}
        try {
            const res=await dispatch(uploadMediaHandlerAsync({formData,token})).unwrap();
            if(res.success){
                toast.success(res.message);
                setRecipeInput({...recipeInput,image:res?.url})
            }
        } catch (error) {
            toast.error(error.message);
        }
        
    }





    const recipiSubmitHandler=async()=>{
        

        try {
            const data={...recipeInput}
            let res;
            if(!location?.state?.isEdit){
             res=await dispatch(createRecipeHandlerAsync({data,token})).unwrap();
           

            }else{
                res=await dispatch(updateRecipeHandlerAsync({data,id:recipeInput?.id,token})).unwrap();
            
            }
             if(res.success){
                toast.success(res.message);
                navigate("/manage-your-recipe")
            }
            
            
        } catch (error) {
         toast.error(error.message);
            
        }
        
    }



    useEffect(()=>{
        
        if (location?.state?.isEdit) {
            setRecipeInput(location.state.recipe);
        }
    },[location.state])
    return (
        <div className="bg-gray-100 min-h-screen py-10 px-5">

            <div className="container mx-auto">

                <div className="mb-10">

                    <Title level={2} className="!mb-1">
                        🍽️ Create New Recipe
                    </Title>

                    <p className="text-gray-500">
                        Share your favourite recipe with thousands of food lovers.
                    </p>

                </div>

                <Form  layout="vertical" onFinish={()=>{recipiSubmitHandler()}}>

                    <Row gutter={[30, 20]}>

                        {/* LEFT */}

                        <Col xs={24} lg={16}>

                            <Card className="rounded-3xl shadow-md ">
                                <div className="flex flex-col gap-5">
                                    <Title level={4}>
                                        📝 Recipe Information
                                    </Title>
 
                                  <div>

                                    <Title level={5}>
                                            👨 Title
                                        </Title>
                                         <CustomInput
                                        label="Recipe Title"
                                        name="title"
                                        onchange={(e)=>{recipeInputHandler(e)}}
                                        value={recipeInput.title}
                                        placeholder={"Enter Recipe Title"}
                                    />
                                  </div>
                                   

                                   
                                  <div>
                                    <Title level={5}>
                                            👨 Description
                                        </Title>
                                         <CustomInput
                                         name="description"
                                        onchange={(e)=>{recipeInputHandler(e)}}
                                        value={recipeInput.description}
                                        label="Recipe Title"
                                        placeholder={"Enter Recipe Description"}
                                    />
                                    </div>

                                  

                                
                                <div className="flex flex-col gap-3">
                                    <div>
                                        <Title level={5}>
                                            👨‍🍳 Instructions
                                        </Title>

                                        <TextArea placeholder="Enter your Instructions"  name="instructions" value={recipeInput.instructions} onChange={(e)=>{recipeInputHandler(e)}}/>

                                    </div>
                                    <div>
                                        <Title level={5}>
                                            👨‍🍳 Cooking Time
                                        </Title>

                                        <CustomInput
                                            name="cookingTime"
                                            onchange={(e)=>{recipeInputHandler(e)}}
                                            value={recipeInput.cookingTime}
                                            textArea
                                            placeholder={"Enter Cooking time in minutes"}
                                            rows={8}
                                        />
                                    </div>
                                    <div>
                                        <Title level={5}>
                                            👨‍🍳 Servings
                                        </Title>

                                        <CustomInput
                                            name="servings"
                                            onchange={(e)=>{recipeInputHandler(e)}}
                                            value={recipeInput.servings}
                                            placeholder={"Enter Number of people can serve per 1 unit"}
                                            textArea
                                            rows={8}
                                        />
                                    </div>
                                </div>
                                </div>

                            </Card>

                        </Col>

                        {/* RIGHT */}

                        <Col xs={24} lg={8}>

                            <Card className="rounded-3xl shadow-md sticky ">

                                <Title level={4}>
                                    📷 Recipe Cover
                                </Title>

                                <Divider />

                               {recipeInput?.image ? <Image className="rounded-xl" src={recipeInput.image}/>: <Upload.Dragger
                                    beforeUpload={() => false}
                                    maxCount={1}
                                    className="rounded-xl"
                                    onChange={(e)=>{mediaUploadHandler(e)}}

                                >

                                    <UploadOutlined
                                        className="text-5xl text-[#E63946]"
                                    />

                                    <p className="mt-4 font-semibold">
                                        Upload Recipe Image
                                    </p>

                                    <p className="text-gray-400">
                                        PNG, JPG or WEBP
                                    </p>

                                </Upload.Dragger>}

                                  <div className="mt-8">
                                        <CustomSelect
                                        onchange={(e)=>{setRecipeInput({...recipeInput,dietType:e})}}
                                        value={recipeInput?.dietType} 
                                        className="w-full"
                                        name="dietType"  
                                        options={[
                                                {
                                                    label: "Vegetarian",
                                                    value: "Vegetarian",
                                                },
                                                {
                                                    label: "Non Vegetarian",
                                                    value: "Non-Vegetarian",
                                                }
                                            ]}
                                        />

                                   

                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        block
                                        size="large"
                                        className="!bg-[#E63946] !border-none mt-5 h-12 rounded-xl"
                                    >
                                        🚀 Publish Recipe
                                    </Button>

                                </div>

                            </Card>

                        </Col>

                    </Row>

                </Form>

            </div>

        </div>
    );
};

export default CreateRecipe;