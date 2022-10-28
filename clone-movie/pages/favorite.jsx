import React, {useState} from 'react';
import {Box} from "@mui/material";
import MuiTab from "../components/ui/MuiTab";
import {listTabFavorite} from "../components/Logic/listKey";
import TabPanel from "@mui/lab/TabPanel";
import MovieFavorite from "../components/Favorite/MovieFavorite";
import TvShowFavorite from "../components/Favorite/TvShowFavorite";

function Favorite(props) {
    const [value, setValue] = useState(listTabFavorite[0].key)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    return (
        <Box>
            <MuiTab list={listTabFavorite} value={value} handleChange={handleChange}>
                <TabPanel value="movies">
                    <Box sx={{
                        width: '70vw', display: 'flex', flexDirection: 'column',
                    }}>
                        <MovieFavorite/>
                    </Box>
                </TabPanel>
                <TabPanel value="tvShow">
                    <Box sx={{
                        width: '70vw', display: 'flex', flexDirection: 'column',
                    }}>
                        <TvShowFavorite/>
                    </Box>
                </TabPanel>
            </MuiTab>
        </Box>
    )
        ;
}

export default Favorite;