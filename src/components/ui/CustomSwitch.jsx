import { Switch } from "antd"

const CustomSwitch=({onchange,checked})=>{
    console.log(checked);
    
    return(
        <>
        <Switch checked={checked} onChange={onchange} />
        </>
    )
}

export default CustomSwitch;