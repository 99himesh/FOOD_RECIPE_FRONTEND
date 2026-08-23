
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

const TestimonialCard=({item})=>{
  console.log(item);
  
    return(
        <>
        
        <Card
                hoverable
                className="rounded-3xl border-0 shadow-md hover:shadow-2xl transition-all duration-300 h-full "
              >
                {/* Quote Icon */}
                <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-6">
                  {/* <Quo/teLeftOutlined className="text-[#E63946] text-2xl" /> */}
                </div>

                {/* Review */}
                <Paragraph className="!text-gray-600 leading-8 text-[15px] min-h-[150px]">
                  "{item.review}"
                </Paragraph>

                {/* Rating */}
                <Rate
                  disabled
                  defaultValue={item.rating}
                  className="text-sm mb-6"
                />

                {/* User */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <Avatar
                    size={56}
                    src={item.image}
                    icon={<UserOutlined />}
                    className="!bg-[#E63946]"
                  />

                  <div>
                    <Title level={5} className="!mb-0">
                      {item.name}
                    </Title>

                    <Text className="text-gray-500">
                      {item.role}
                    </Text>
                  </div>
                </div>
              </Card>
        </>
    )
}


export default TestimonialCard;