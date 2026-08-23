import { Avatar, Card, Rate, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";


const Review=({recipe})=>{
    return(
        <div className="mb-5">
        <Card className="mt-8 rounded-xl shadow-sm" title="Customer Reviews">
          <div className="max-h-[300px] overflow-auto ">
  {recipe?.RateReviews?.map((item) => (
    <div key={item.id}>
      <div className="flex gap-4">
        <Avatar
        src={item?.User?.profilePic}
          size={45}
          icon={<UserOutlined />}
        />

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{item.User.name}</h3>

             
            </div>

           
          </div>

          <p className="text-gray-600 mt-2 leading-6">
            {item.review}
          </p>
        </div>
      </div>

      <Divider />
    </div>
  ))}
  </div>
</Card>
        </div>
    )
}
export default Review;