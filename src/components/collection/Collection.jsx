import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Typography,
  Input,
  Button,
  Select,
  Empty,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  ReloadOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import CollectionCard from "../common/CollectionCard";
import { Link } from "react-router-dom";
import CustomModal from "../ui/CustomModal";
import CreateCollection from "./CreateCollection";
import { useDispatch, useSelector } from "react-redux";
import { getCollectionAsync } from "../../feature/collectionSlice";
import CustomText from "../ui/CustomText";
import Cookies from "js-cookie";

const { Title, Paragraph } = Typography;



const Collection = () => {
  const [search, setSearch] = useState("");
  const token=Cookies.get("token");
  const [collectionModel,setCollectionModel]=useState(false);
  const [isEdit,setIsEdit]=useState(false)
  const [collectionInput,setCollectionInput]=useState({
    image:"",
    collectionName:""
  });
  const dispatch=useDispatch();
  const {collection}=useSelector(state=>state.collection);
  const {recipe}=useSelector(state=>state.recipe);
  const getCollectionHandler=async()=>{
      const data={}
      try {
        const res=await dispatch(getCollectionAsync({token})).unwrap(); 
      } catch (error) {
        toast.error(error.message);
      }
    }

   const editCollectionData=(data)=>{
    setIsEdit(true)
    setCollectionInput({...data})
  }  





  
    useEffect(()=>{
      getCollectionHandler();
    },[])


  

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">

          <div className="inline-flex items-center gap-2 bg-red-100 text-[#E63946] px-5 py-2 rounded-full font-medium">
            <FolderOpenOutlined />
            Recipe Collections
          </div>

          <Title className="!mt-6">
            Organize Your <span className="text-[#E63946]">Favorite Recipes</span>
          </Title>

          <Paragraph className="max-w-2xl mx-auto !text-gray-500">
            Create collections to organize recipes by cuisine, meal type,
            occasions, or your own cooking style.
          </Paragraph>

        </div>
      </section>

      {/* Toolbar */}
      <section className="container mx-auto px-6 py-10">

        <div className=" container mx-auto rounded-2xl  p-6 mb-10">

          <Row gutter={[16, 16]} align="center">

            <Col xs={24} md={10} >
              {/* <Input
                size="large"
                placeholder="Search collections..."
                prefix={<SearchOutlined />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              /> */}
            </Col>

           

           
            <Col xs={24} md={24}>
              <div className="flex justify-between">
            <CustomText className={"!text-[30px] font-semibold"} value={"Your Collections"}/>
              <Button
              onClick={()=>{setCollectionModel(true),setCollectionInput({image:"",collectionName:""}),setIsEdit(false)}}
                type="primary"
                block
                size="large"
                
                icon={<PlusOutlined />}
                className="!bg-[#E63946] !border-[#E63946] !w-[300px]"
              >
                New Collection
              </Button>
              </div>
            </Col>

          </Row>

        </div>

        {/* Collection Grid */}
        {collection?.length ? (
          <Row gutter={[24, 24]}>
            {collection?.map((collection) => (
              <Col
                xs={24}
                sm={12}
                lg={8}
                xl={6}
                key={collection.id}
              >
                <CollectionCard getCollectionHandler={getCollectionHandler} editCollectionData={editCollectionData} setCollectionModel={setCollectionModel} collection={collection} />
              </Col>
            ))}
          </Row>
        ) : (
          <Empty
            description="No Collections Found"
            className="mt-20"
          />
        )}

      </section>
      <CustomModal setOpen={setCollectionModel} open={collectionModel} modalBody={<CreateCollection isEdit={isEdit} getCollectionHandler={getCollectionHandler} setCollectionInput={setCollectionInput} collectionInput={collectionInput}  setCollectionModel={setCollectionModel}/>} />
    </div>
  );
};

export default Collection;