import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Input,
  Select,
  Typography,
  Button,
  Space,
  Empty,
} from "antd";
import {
  SearchOutlined,
  TeamOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import AuthorCard from "../common/AuthorsCard";
import { getAuthorHandlerAsync } from "../../feature/userSlice";
import { useDispatch, useSelector } from "react-redux";
import CustomPagination from "../ui/CustomPagination";
import Cookies from "js-cookie"
const { Title, Paragraph } = Typography;


const Authors = () => {
  const [search, setSearch] = useState("");
  const [page,setPage]=useState();
  const dispatch=useDispatch();
  const {authors}=useSelector(state=>state.user) 
  const token=Cookies.get("token");

  

  const getRecipeHandler=async()=>{
      const data = {
        page: page,
        limit: 12,
        ...(search && { search: search })
        };
      try {
        const res=await dispatch(getAuthorHandlerAsync({data,token})).unwrap();
            
        
      } catch (error) {
        console.log(error);
        
      }
    }
  
  
    useEffect(()=>{
      getRecipeHandler();
    },[page,search])

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">

          <div className="inline-flex items-center gap-2 bg-red-100 text-[#E63946] px-5 py-2 rounded-full font-medium mb-5">
            <TeamOutlined />
            Top Recipe Creators
          </div>

          <Title className="!mb-3">
            Meet Our Amazing <span className="text-[#E63946]">Authors</span>
          </Title>

          <Paragraph className="!text-gray-500 max-w-2xl mx-auto">
            Discover talented chefs and home cooks sharing thousands of
            delicious recipes with our growing food community.
          </Paragraph>

        </div>
      </section>

      {/* Search & Filter */}
      <section className="container mx-auto px-6 py-10">
<section className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-6">

          <Row gutter={[16, 16]} align="middle">

            <Col xs={24} sm={24} md={12} lg={8} xl={12} xxl={12}>
              <Input
                size="large"
                placeholder="Search authors..."
                prefix={<SearchOutlined />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>

            

           

           

          

          </Row>

        </div>
      </section>
       

        {/* Authors */}
        <Row gutter={[24, 24]}>

          {authors?.result?.length ? (
            authors?.result?.map((author) => (
              <Col
                xs={24}
                sm={12}
                lg={8}
                xl={6}
                key={author?.id}
              >
                <AuthorCard  author={author} />
              </Col>
            ))
          ) : (
            <Col span={24}>
              <Empty description="No Authors Found" />
            </Col>
          )}

        </Row>
          <div className="flex justify-center">
            <CustomPagination pageNumber={page} onchange={(e)=>{setPage(e)}}  total={authors?.count} />
          </div>


       

      </section>

    </div>
  );
};

export default Authors;