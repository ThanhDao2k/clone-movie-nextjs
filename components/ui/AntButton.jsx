import React from "react";
import {Button} from "antd";

const AntButton = ({type, shape, icon, ...rest}) => {

    return <Button type={type} shape={shape} icon={icon} {...rest}/>
}
export default AntButton