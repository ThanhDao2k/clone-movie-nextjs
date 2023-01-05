import React from 'react';
import {Box} from "@mui/material";
import ItemMovie from "./itemMovie";

function ListMovies({list}) {
    return (
        <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            {
                list && list?.map(item => <ItemMovie item={item}/>)
            }
        </Box>
    );
}

export default ListMovies;