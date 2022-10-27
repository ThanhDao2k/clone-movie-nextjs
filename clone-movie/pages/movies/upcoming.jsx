import React, {useState} from 'react';
import {Box, Pagination, Typography} from "@mui/material";
import ListMovies from "../../components/movie/ListMovies";
import useSWR from "swr";
import {apiKey, baseUrl} from "../../components/api/listUrl";

const bodyStyle = {
    width: '70vw',
    padding: '30px 40px'
}
const fetcher = (url) => fetch(url).then(res => res.json())
const url = `${baseUrl}movie/upcoming?api_key=${apiKey}&language=en-US&page=`

function Upcoming(props) {
    const [page, setPage] = useState(1)
    const handleChangePage = (event, value) => {
        setPage(value)
    }
    const {data} = useSWR(`${url}${page}`, fetcher)
    return (
        <Box sx={bodyStyle}>
            <Box>
                <Typography
                    sx={{fontSize: '24px', fontWeight: 600, color: 'blue', paddingLeft: '10px'}}>UpComing</Typography>
                <Box>
                    <ListMovies list={data?.results}/>

                </Box>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                {
                    data &&
                    <Pagination count={data?.total_pages > 20 ? 20 : data?.total_pages} shape="rounded" showFirstButton
                                showLastButton page={page}
                                onChange={handleChangePage}/>
                }
            </Box>
        </Box>
    );
}

export default Upcoming;