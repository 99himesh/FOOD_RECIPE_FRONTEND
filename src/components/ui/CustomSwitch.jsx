import { Switch } from "antd"

const CustomSwitch=({onchange,checked})=>{
    return(
        <>
        <Switch checked={checked} onChange={onchange} />
        </>
    )
}

export default CustomSwitch;