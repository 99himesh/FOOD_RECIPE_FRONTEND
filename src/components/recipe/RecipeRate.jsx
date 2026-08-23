import { Button, Card, Rate } from "antd";
import { useState } from "react";
import CustomInput from "../ui/CustomInput";
import { useDispatch } from "react-redux";
import { addRateAndReviewAsync } from "../../feature/rateSlice";
import toast from "react-hot-toast";
import Review from "./Review";

const RecipeRate = ({id,getRecipeByIdHandler,recipe}) => {
    const dispatch=useDispatch();
  const [reviewData, setReviewData] = useState({
    rate: 0,
    review: "",
  });
  console.log(reviewData,"lknlk");
  

  const handleSubmit = async() => {
    const data={
        ...reviewData,RecipeId:id
    }
     try {
        const res=await dispatch(addRateAndReviewAsync({data})).unwrap();
        console.log(res);
        if(res.success){
            toast.success(res.message);

            getRecipeByIdHandler(id);
            setReviewData({
              rate: null,
               review: "",
            })
        }
        
     } catch (error) {
        console.log(error);
        
     }
    // Dispatch API here
  };

  return (<>
          <Review recipe={recipe}/>
  
  <Card
      title={
        <h2 className="text-xl font-semibold text-[#E63946]">
          Rate & Review
        </h2>
      }
      className="container mx-auto rounded-2xl shadow-lg"
    >
      <div className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Your Rating
          </label>

          <Rate
            allowHalf
            value={reviewData.rating}
            onChange={(value) =>
              setReviewData((prev) => ({
                ...prev,
                rate: value,
              }))
            }
            className="text-2xl"
          />

          <p className="text-gray-500 mt-2">
            {reviewData.rating
              ? `${reviewData.rating} / 5`
              : "Tap to rate this recipe"}
          </p>
        </div>

        {/* Review */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Write Your Review
          </label>

          <CustomInput
            type="textarea"
            rows={5}
            placeholder="Tell everyone what you liked about this recipe..."
            value={reviewData.review}
            onchange={(e) =>
              setReviewData((prev) => ({
                ...prev,
                review: e.target.value,
              }))
            }
          />
        </div>

        {/* Button */}
        <Button
          type="primary"
          size="large"
          className="w-full !bg-[#E63946] hover:!bg-[#d62839]"
          onClick={handleSubmit}
        >
          Submit Review
        </Button>
      </div>
    </Card>
  
  </>
    
  );
};

export default RecipeRate;