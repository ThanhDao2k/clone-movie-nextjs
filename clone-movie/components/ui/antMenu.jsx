import React from "react";
import {Menu} from "antd";
import Icon from "@ant-design/icons";
import AntTypography from "./antTypography/AntTypography";

const menuStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    top: 0,
    left: 0,
    maxWidth: '400px',
    width: '100%',
    cursor: 'pointer',
    color: 'white',
    listStyleType: 'none',
}
const AntMenu = ({items = [], handleClick, selected = ''}) => {


    return <Menu onClick={(e) => handleClick(e)} selectedKeys={[selected]} mode="horizontal" style={menuStyle}>
        {
            items.map(item =>
                <Menu.Item key={item.id} style={{padding: 0}}>
                    {item.icon && <Icon type={item.icon}/>}
                    <AntTypography style={{color: 'white', fontSize: '16px', padding: '8px', fontWeight: 600}}>
                        {item.label}
                    </AntTypography>
                </Menu.Item>)
        }
    </Menu>
}
export default AntMenu