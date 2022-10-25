import React from 'react';
import {Rating} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

function MuiRate({value,precision,size="large" }) {
    return (
        <Rating
            name="hover-feedback"
            value={value}
            precision={precision}
            readOnly
            max={10}
            size={size}
            emptyIcon={<StarIcon style={{opacity: 0.55, color: 'white'}} fontSize="inherit"/>}
        />
    );
}

export default MuiRate;