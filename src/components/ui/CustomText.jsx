import {  Typography } from 'antd';
const { Text } = Typography;


const CustomText=({value,className})=>{
    return(
        <>
        <Text  className={`text-[14px]   ${className}`}>{value}</Text>
        </>
    )
}
export default CustomText;