import { Row, Col, Card, Avatar, Typography, Rate, Tag } from "antd";
import {
  UserOutlined,
//   QuoteLeftOutlined,
} from "@ant-design/icons";

import "swiper/css";
import "swiper/css/pagination";
const { Title, Paragraph, Text } = Typography;
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import TestimonialCard from "../common/TestimonialCard";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Home Chef",
    image: "",
    rating: 5,
    review:
      "I've discovered so many amazing recipes on this platform. The step-by-step instructions are easy to follow, and every dish I've tried has turned out delicious.",
  },
  {
    id: 2,
    name: "David Wilson",
    role: "Food Blogger",
    image: "",
    rating: 5,
    review:
      "As a food blogger, I love how easy it is to share recipes and connect with other food lovers. This community is inspiring and full of creative ideas.",
  },
  {
    id: 3,
    name: "Emily Carter",
    role: "Food Enthusiast",
    image: "",
    rating: 5,
    review:
      "The Recipe of the Day feature has introduced me to dishes from different cultures. It's become my go-to platform whenever I want to cook something new.",
  },
  {
    id: 3,
    name: "Emily Carter",
    role: "Food Enthusiast",
    image: "",
    rating: 5,
    review:
      "The Recipe of the Day feature has introduced me to dishes from different cultures. It's become my go-to platform whenever I want to cook something new.",
  },
   {
    id: 3,
    name: "Emily Carter",
    role: "Food Enthusiast",
    image: "",
    rating: 5,
    review:
      "The Recipe of the Day feature has introduced me to dishes from different cultures. It's become my go-to platform whenever I want to cook something new.",
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 ">
      <div className="container mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <Tag
            color="#E63946"
            className="px-4 py-1 rounded-full text-sm font-medium"
          >
            Testimonials
          </Tag>

          <Title level={2} className="!mt-4 !mb-3">
            Loved by Food Lovers ❤️
          </Title>

          <Paragraph className="!text-gray-500 max-w-2xl mx-auto">
            Join thousands of happy cooks who trust our platform for delicious
            recipes, cooking inspiration, and a wonderful food community.
          </Paragraph>
        </div>

        {/* Cards */}
        <Row gutter={[24, 24]}>

          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={25}
            slidesPerView={3}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            // pagination={{ clickable: true }}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
          
          {testimonials.map((item) => (
            <Col xs={24} md={12} lg={6} key={item.id}>
             <SwiperSlide key={item.id} className="py-3">
              
                <TestimonialCard item={item}/>
              
            </SwiperSlide>

            </Col>
          ))}
          </Swiper>

        </Row>

      

      </div>
     </section>
  );
};

export default Testimonials;