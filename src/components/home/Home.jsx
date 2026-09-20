import { useDispatch, useSelector } from "react-redux";
import HeroBanner from "./Hero";
import LatestRecipes from "./LatestRecipe";
import Testimonials from "./Testimonial";
import { useEffect } from "react";
import { getHomeHandlerAsync } from "../../feature/homeSlice";
import toast from "react-hot-toast";

const Home = () => {
  const dispatch = useDispatch();
  const { home } = useSelector(state => state.home);


  const getHomeAsync = async () => {
    try {
      const res = await dispatch(getHomeHandlerAsync({})).unwrap();
    } catch (error) {
      toast.error(error.message);
    }
  }


  useEffect(() => {
    getHomeAsync();
  }, [])
  return (
    <>
      <HeroBanner home={home} />
      <LatestRecipes recipe={home.recipe} />
      <Testimonials />
    </>
  )
}
export default Home;