import React from 'react';
import {Box, Card, CardContent, Typography} from "@mui/material";
import Img from "../ui/Img";

function ItemCasts({item}) {
    const {id, name, profile_path, character, popularity} = item
    return (
        <Card key={id} sx={{width: "138px", margin: '5px 10px', flexShrink: 0}}>
            <Img url={profile_path} height="175px" width="138px"/>
            <Box sx={{padding: '10px'}}>
                <Typography sx={{fontWeight: 600}}>{name}</Typography>
                <Typography>{character}</Typography>
                <Typography>{popularity}</Typography>
            </Box>
        </Card>
    );
}

export default ItemCasts;