import React from 'react';
import {Box} from "@mui/material";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

function Img({url, width, height, ...rest}) {
    if (!url) {
        return <Box sx={{
            width,
            height,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center', backgroundColor: '#e7e7e7'
        }}><PersonOutlineOutlinedIcon/></Box>
    }
    return (
        <img src={`https://image.tmdb.org/t/p/original/${url}`} width={width} height={height} {...rest} alt="loi"/>
    );
}

export default Img;