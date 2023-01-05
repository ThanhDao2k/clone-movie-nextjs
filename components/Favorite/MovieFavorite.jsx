import React, {useState} from 'react';
import {Box, Pagination, Typography} from "@mui/material";
import {apiKey, baseUrl} from "../api/listUrl";
import {getLocalStorage} from "../Logic/common";
import ListMovies from "../movie/ListMovies";

const url = `${baseUrl}account/{account_id}/favorite/movies?api_key=<<api_key>>&language=en-US&sort_by=created_at.asc&page=1`
const fetcher = (url) => fetch(url).then(res => res.json())
const urlGetAccount = `${baseUrl}account?api_key=${apiKey}&session_id=`

function MovieFavorite(props) {
    const session_id = getLocalStorage('session_id')
    const [listFavorite, setListFavorite] = useState([])
    const [page, setPage] = useState(1)
    fetcher(`${urlGetAccount}${session_id}`).then(r => {
        fetcher(`${baseUrl}account/${r.id}/favorite/movies?api_key=${apiKey}&session_id=${session_id}&language=en-US&sort_by=created_at.asc&page=${page}`).then(data => setListFavorite(data))
    })
    const handleChangePage = (event, value) => {
        setPage(value)
    }
    if (!listFavorite) return

    return (
        <Box>
            <Box>
                <Typography
                    sx={{fontSize: '24px', fontWeight: 600, color: 'blue', paddingLeft: '10px'}}>favorite
                    movie</Typography>
                <Box>
                    <ListMovies list={listFavorite?.results}/>

                </Box>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                {
                    listFavorite?.total_pages > 1 &&
                    <Pagination count={listFavorite?.total_pages} shape="rounded" showFirstButton
                                showLastButton page={page}
                                onChange={handleChangePage}/>
                }
            </Box>
        </Box>
    )
        ;
}

export default MovieFavorite;