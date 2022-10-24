import React, {useRef} from 'react';
import ItemMovie from "../components/movie/itemMovie";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Box, Typography} from "@mui/material";
import Slider from 'react-slick'

const contentStyle = {
    width: '70vw', display: 'flex', justifyContent: 'center', alignItems: "center", flexDirection: 'column'
}

const fetcher = (url) => fetch(url).then(res => res.json())
const url = 'https://api.themoviedb.org/3/movie/popular?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US&page=2'

function Index({list}) {
    return (<Box sx={contentStyle}>
            <Box><Typography sx={{
                fontWeight: 600, fontSize: '24px', marginRight: '20px', whiteSpace: 'nowrap'
            }}>What's Popular</Typography></Box>
            <Box style={{display: 'flex', flexDirection: 'row', flexWrap: "wrap"}}>
                {list.map(item => {
                    return <Box key={item.id}><ItemMovie item={item}/></Box>
                })}
            </Box>
        </Box>);
}

export async function getServerSideProps() {
    const data = await fetcher(url)
    return {
        props: {list: data.results},
    };
}

export default Index;