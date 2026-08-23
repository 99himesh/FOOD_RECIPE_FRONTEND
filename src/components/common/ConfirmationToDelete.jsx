import CustomButton from "../ui/CustomButton";
import CustomText from "../ui/CustomText";

const ConfirMationToDelete=({setConfirm,deleteHandler})=>{
    return(
        <>
        <CustomText className={"text-[#000] font-semibold !text-[16px]"} value={"Are you sure you want to delete ?"} />
            <div className="flex gap-3 justify-end  pt-3 ">  
            <CustomButton onclick={()=>{setConfirm(false)}}  value={"No"}/>
            <CustomButton onclick={()=>{deleteHandler()}} value={"Yes"}/>
        </div>
        </>
    )
}

export default ConfirMationToDelete;