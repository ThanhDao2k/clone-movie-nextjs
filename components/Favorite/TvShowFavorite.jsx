import React, {useState} from 'react';
import {Box, Pagination, Typography} from "@mui/material";
import ListMovies from "../movie/ListMovies";
import {getLocalStorage, setLocalStorage} from "../Logic/common";
import {apiKey, baseUrl} from "../api/listUrl";

const fetcher = (url) => fetch(url).then(res => res.json())
const urlGetAccount = `${baseUrl}account?api_key=${apiKey}&session_id=`

function TvShowFavorite(props) {
    const session_id = getLocalStorage('session_id')
    const [listFavorite, setListFavorite] = useState([])
    const [page, setPage] = useState(1)
    fetcher(`${urlGetAccount}${session_id}`).then(r => {
        setLocalStorage('account_id', r.id)
        fetcher(`${baseUrl}account/${r.id}/favorite/tv?api_key=${apiKey}&session_id=${session_id}&language=en-US&sort_by=created_at.asc&page=${page}`).then(data => setListFavorite(data))
    })
    const handleChangePage = (event, value) => {
        setPage(value)
    }

    return (
        <Box>
            <Box>
                <Typography
                    sx={{fontSize: '24px', fontWeight: 600, color: 'blue', paddingLeft: '10px'}}>favorite
                    TV show</Typography>
                {
                    listFavorite.length > 0 ? (<Box><ListMovies list={listFavorite?.results}/></Box>) : (
                        <Typography>Không có chương trình TV show favorite</Typography>)
                }
            </Box>
            {
                listFavorite?.total_pages > 1 &&
                <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                    <Pagination count={listFavorite?.total_pages} shape="rounded" showFirstButton
                                showLastButton page={page}
                                onChange={handleChangePage}/>
                </Box>
            }
        </Box>
    );
}

export default TvShowFavorite;