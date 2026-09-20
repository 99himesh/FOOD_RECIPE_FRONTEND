import { Button, Card, Col, Row, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../ui/CustomInput";
import Banner from "../../assets/recipe/auth.avif"
import {  useState } from "react";
const { Title, Paragraph, Text } = Typography;
import {useDispatch, useSelector} from "react-redux"
import { signUpHandlerAsync } from "../../feature/userSlice";
import toast from "react-hot-toast";
const SignUp = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
   const [signUpInput,setSignUpInput]=useState({
      name:"",
      email:"",
      mobile:"",
      password:""
   });
  
   
   const signUpInputHandler=(e)=>{
    const {name,value}=e.target;
      setSignUpInput({...signUpInput,[name]:value})
   }
   

   const signUpHandler=async(e)=>{
    e.preventDefault()
   try {
    const data={...signUpInput}
    const res=await dispatch(signUpHandlerAsync({data})).unwrap();
    if(res.success){
      toast.success(res.message)
      navigate("/login")
    }
   } catch (error) {
    console.log(error)
    toast.error(error.message)
    
   }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-5"  style={{
        backgroundImage: `url(${Banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      <Row justify="center" className="w-full">
        <Col xs={24} sm={20} md={16} lg={10} xl={6}>
          <Card
            bordered={false}
            className="rounded-3xl shadow-xl"
          >
            {/* Heading */}
            <div className="text-center mb-8">
              <Title level={2} className="!mb-2">
                Create Account 👨‍🍳
              </Title>

              <Paragraph className="!text-gray-500">
                Join our recipe community and start sharing delicious recipes.
              </Paragraph>
            </div>

            {/* Form */}
            <form onSubmit={signUpHandler}  className="flex flex-col gap-3">

              <CustomInput
                name="name"
                onchange={(e)=>{signUpInputHandler(e)}}
                value={signUpInput.name}
                label="Full Name"
                placeholder="Enter your full name"
              />

              <CustomInput
                name="email"
                onchange={(e)=>{signUpInputHandler(e)}}
                value={signUpInput.email}
                label="Email"
                type="email"
                placeholder="Enter your email"
              />

              <CustomInput
                name="mobile"
                onchange={(e)=>{signUpInputHandler(e)}}
                value={signUpInput.mobile}
                placeholder="Enter your mobile number"
              />

              <CustomInput
                name="password"
                onchange={(e)=>{signUpInputHandler(e)}}
                value={signUpInput.password}
                label="Password" 
                type="password"
                placeholder="Enter your password"
              />

              <Button
                htmlType="submit"
                type="primary"
                block
                size="large"
                className="!bg-[#E63946] !border-[#E63946] !h-12 rounded-xl font-semibold"
              >
                Create Account
              </Button>

            </form>

            {/* Login */}
            <div className="text-center mt-8">
              <Text className="text-gray-500">
                Already have an account?{" "}
              </Text>

              <Link
                to="/login"
                className="!text-[#E63946] font-semibold hover:text-red-600"
              >
                Sign In
              </Link>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;