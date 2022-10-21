import React from "react";
import {Typography} from "antd";

const AntTypography = ({...rest}) => {
    const {Text} = Typography

    return <Text {...rest} />
}
export default AntTypography