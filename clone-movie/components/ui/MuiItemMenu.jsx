import React, {useState} from 'react';
import {Box, Button, Fade, Menu, MenuItem, Typography} from "@mui/material";

const textStyle = {
    fontSize: '16px', padding: '8px', fontWeight: 600
}
const childrenStyle = {
    fontSize: '16px', padding: '8px',
}

function MuiItemMenu({item, onClickItem, onClickItemChildren}) {
    const {id, label, children} = item
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        if(!children){
            onClickItem(item.id)
        }
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box key={id} >
            <Button onClick={handleClick}><Typography sx={textStyle}
                                                      color='white'>{label}</Typography></Button>
            {
                children && (<Menu MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                                   anchorEl={anchorEl}
                                   open={open}
                                   onClose={handleClose}
                                   TransitionComponent={Fade}>
                    {
                        children.map(d => <MenuItem key={d.key} onClick={() => {
                            onClickItemChildren(d.key)
                            setAnchorEl(null)
                        }}><Typography
                            sx={childrenStyle}>{d.value}</Typography></MenuItem>)
                    }
                </Menu>)
            }
        </Box>
    );
}

export default MuiItemMenu;