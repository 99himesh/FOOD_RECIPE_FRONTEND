import {
  Card,
  Avatar,
  Typography,
  Button,
  Space,
  Rate,
  Divider,
} from "antd";
import {
  UserOutlined,
  BookOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import CustomText from "../ui/CustomText";
import { useDispatch } from "react-redux";
import { followUserHandler, followUserHandlerAsync, unFollowUserHandler, UnfollowUserHandlerAsync } from "../../feature/userSlice";
import toast from "react-hot-toast";

const { Title, Text } = Typography;

const AuthorCard = ({ author }) => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const followHandler=async()=>{
    try {
      const data={followingId:author?.id}
      const res=await dispatch(followUserHandlerAsync({data})).unwrap();
      console.log(res);
      if(res?.success){
        toast.success(res.message);
        dispatch(followUserHandler(author?.id))
      }
      

      
    } catch (error) {
      
    }
  }


   const unFollowHandler=async()=>{
    try {
      const res=await dispatch(UnfollowUserHandlerAsync({id:author?.id})).unwrap();
      console.log(res);
      if(res?.success){
        toast.success(res.message);
        dispatch(unFollowUserHandler(author?.id))
      }
      

      
    } catch (error) {
      
    }
  }





  return (
    <Card
      hoverable
      className="rounded-3xl border-0 shadow-md hover:shadow-xl transition-all duration-300"
    >
      {/* Cover */}
      <div className="relative h-28 bg-gradient-to-r from-[#E63946] to-red-400 rounded-2xl">
        <Avatar
          size={90}
          src={author?.image}
          icon={<UserOutlined />}
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 border-4 border-white !bg-[#E63946]"
        />
      </div>

      {/* Body */}
      <div className="pt-14 text-center">
        <Title level={4} className="!mb-1">
          {author?.name}
        </Title>
        <CustomText value={author?.email}/>

        {/* Stats */}
        {/* <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <BookOutlined className="text-[#E63946] text-xl" />
            <Title level={5} className="!mb-0 mt-2">
              {author?.recipes}
            </Title>
            <Text className="text-gray-500 text-xs">
              Recipes
            </Text>
          </div>

          <div>
            <TeamOutlined className="text-[#E63946] text-xl" />
            <Title level={5} className="!mb-0 mt-2">
              {author?.followers}
            </Title>
            <Text className="text-gray-500 text-xs">
              Followers
            </Text>
          </div>

          <div>
            <UserOutlined className="text-[#E63946] text-xl" />
            <Title level={5} className="!mb-0 mt-2">
              {author?.following}
            </Title>
            <Text className="text-gray-500 text-xs">
              Following
            </Text>
          </div>
        </div> */}

        <Space className="mt-8 w-full" direction="vertical">
          <Button
          onClick={()=>{author.isFollow?unFollowHandler():followHandler()}}
            type="primary"
            block
            className="!bg-[#E63946] !border-[#E63946] !h-11 rounded-xl"
          >
            {author.isFollow? "Following":"Follow"}
          </Button>

          <Button
          onClick={()=>{navigate(`/author-recipe/${author.id}`)}}
            block
            className="!h-11 rounded-xl"
          >
            View Profile
          </Button>
        </Space>
      </div>
    </Card>
  );
};

export default AuthorCard;