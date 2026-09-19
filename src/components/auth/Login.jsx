import { Button, Card, Col, Row, Typography, Checkbox } from "antd";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../ui/CustomInput";
import Banner from "../../assets/recipe/auth.avif"
import { useState } from "react";
import { loginHandlerAsync } from "../../feature/userSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const { Title, Paragraph, Text } = Typography;

const Login = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {error}=useSelector(state=>state.user);
  
   const [loginInput,setLoginInput]=useState({
        emailAndMobile:"",
        password:""
     });

   const loginInputHandler=(e)=>{
    const {name,value}=e.target;
    setLoginInput({...loginInput,[name]:value})
   }
  const loginHandler =async (e) => {
    
    e.preventDefault()
       try {
        const data={...loginInput}
        const res=await dispatch(loginHandlerAsync({data})).unwrap();
        
        if(res.success){
          toast.success(res.message);
          if(res?.user?.role=="user"){
            navigate("/recipe")
          }else{
            navigate("/admin/users")

          }
        }
       } catch (error) {
        
        toast.error(error.message)

        
       }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-5 py-10" 
    style={{
        backgroundImage: `url(${Banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      <Row justify="center" className="w-full">
        <Col xs={24} sm={20} md={14} lg={10} xl={6}>
          <Card
            bordered={false}
            className="rounded-3xl shadow-xl"
          >
            {/* Heading */}
            <div className="text-center mb-8">
              <Title level={2} className="!mb-2">
                Welcome Back 👋
              </Title>

              <Paragraph className="!text-gray-500">
                Login to continue exploring and sharing delicious recipes.
              </Paragraph>
            </div>

            {/* Form */}
            <form onSubmit={loginHandler} className="flex flex-col gap-5">

              <CustomInput
                onchange={(e)=>{loginInputHandler(e)}}
                name="emailAndMobile"
                value={loginInput.emailAndMobile}
                label="Email or Mobile" 
                placeholder="Enter your email or mobile number"
              />

              <CustomInput
                onchange={(e)=>{loginInputHandler(e)}}
                name="password"
                value={loginInput.password}
                label="Password"
                type="password"
                placeholder="Enter your password"
              />

              {/* Remember & Forgot */}
             

              <Button
                htmlType="submit"
                type="primary"
                block
                size="large"
                className="!bg-[#E63946] !border-[#E63946] !h-12 rounded-xl font-semibold"
              >
                Login
              </Button>

            </form>

            {/* Sign Up */}
            <div className="text-center mt-8">
              <Text className="text-gray-500">
                Don't have an account?
              </Text>

              <Link
                to="/signup"
                className="!text-[#E63946] font-semibold hover:text-red-600"
              >
               SignUp
              </Link>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Login;