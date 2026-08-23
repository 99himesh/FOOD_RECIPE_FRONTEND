import { useDispatch, useSelector } from "react-redux";
import HeroBanner from "./Hero";
import LatestRecipes from "./LatestRecipe";
import Testimonials from "./Testimonial";
import { useEffect } from "react";
import { getHomeHandlerAsync } from "../../feature/homeSlice";

const Home=()=>{
    const dispatch=useDispatch();
    const {home}=useSelector(state=>state.home);
    
    
     const getHomeAsync=async()=>{
            try {
              const res=await dispatch(getHomeHandlerAsync({})).unwrap();
                  
              console.log(res);
              
            } catch (error) {
              console.log(error);
              
            }
          }
        
        
          useEffect(()=>{
            getHomeAsync();
          },[]) 
    return(
        <>
        <HeroBanner home={home} />
        <LatestRecipes recipe={home.recipe}/>
        <Testimonials/>
        </>
    )
}
export default Home;