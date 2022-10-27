import React, {useRef} from 'react';
import ItemMovie from "../components/movie/itemMovie";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Box, Typography} from "@mui/material";
import Slider from 'react-slick'
import {getLocalStorage, setLocalStorage} from "../components/Logic/common";
import {apiKey, baseUrl} from "../components/api/listUrl";

const contentStyle = {
    width: '70vw', display: 'flex', justifyContent: 'center', alignItems: "center", flexDirection: 'column'
}

const fetcher = (url) => fetch(url).then(res => res.json())
const url = `${baseUrl}movie/popular?api_key=${apiKey}&language=en-US&page=2`

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