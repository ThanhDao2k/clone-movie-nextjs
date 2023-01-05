import React from 'react';
import {Avatar} from "@mui/material";

function MuiAvatar({width, height, url}) {
    return (<Avatar
            alt="Remy Sharp"
            src={`https://image.tmdb.org/t/p/original/${url}`}
            sx={{width, height}}
        />
    );
}

export default MuiAvatar;