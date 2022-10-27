import React from 'react';
import {Box} from "@mui/material";
import {Typography} from "antd";

const containerStyle = {
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}
const contentStyle = {
    width: '70vw',
}

function Index(props) {
    return (
        <Box sx={containerStyle}>
            <Box sx={contentStyle}>
                <Typography>hihi</Typography>
            </Box>

        </Box>
    );
}

export default Index;