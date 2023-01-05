import React from 'react';
import {Box} from "@mui/material";
import MuiItemMenu from "./MuiItemMenu";

const menuStyle = {
    display: 'flex',
    cursor: 'pointer',
}

function MuiMenu({items, onClickItem, onClickItemChildren}) {
    return (
        <Box sx={menuStyle}>
            {
                items.map(item => <MuiItemMenu item={item} onClickItem={onClickItem}
                                               onClickItemChildren={onClickItemChildren}/>)
            }
        </Box>
    );
}

export default MuiMenu;