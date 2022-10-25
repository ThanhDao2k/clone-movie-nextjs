import React from 'react';
import {Box, Typography} from "@mui/material";
import Img from "../../../components/ui/Img";
import {generateList, getListDepartment} from "../../../components/Logic/common";
import {useRouter} from "next/router";

export const getStaticPaths = async () => {
    const res = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US&page=2');
    const data = await res.json();
    const paths = data?.results.map(movie => {
        return {
            params: {moviesID: movie.id.toString()}
        }
    })

    return {
        paths, fallback: false
    }
}
export const getStaticProps = async ({params}) => {
    const id = params.moviesID;
    const data3 = await fetch('http://api.themoviedb.org/3/movie/' + id + '/casts?api_key=e9e9d8da18ae29fc430845952232787c')
    const casts = await data3.json()
    const data2 = await fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=e9e9d8da18ae29fc430845952232787c&append_to_response=videos')
    const details = await data2.json()
    return {
        props: {casts, details}
    }
}

const containerStyle = {
    display: 'flex', justifyContent: 'center', width: '70vw', flexDirection: 'row', padding: '30px 40px'
}
const castsStyle = {
    flex: 1
}
const crewStyle = {flex: 1}

const headerStyle = {
    fontSize: '22px', fontWeight: 600, marginBottom: '20px',

}
const ItemCasts = ({item}) => {
    return <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '20px',
        marginTop: '20px',
        alignItems: 'center'
    }} key={item.id}>
        <Img url={item.profile_path} width="66px" height="66px"/>
        <Box sx={{paddingLeft: '14px', paddingRight: '20px'}}>
            <Typography sx={{fontWeight: 700, fontSize: '16px'}}>{item.name}</Typography>
            <Typography sx={{fontSize: '14px', opacity: 0.8}}>{item.character}</Typography>
            <Typography sx={{fontSize: '14px', opacity: 0.8}}>{item.job}</Typography>
        </Box>
    </Box>
}
const ItemCrew = ({list, item}) => {
    return <Box sx={{display: 'flex', flexDirection: 'column'}}>
        <Typography sx={{fontWeight: 600, fontSize: '16px'}}>{item}</Typography>
        {
            generateList(list, item).map(d => <ItemCasts item={d}/>)
        }
    </Box>
}
const ItemList = ({url, name, date, onClick}) => {

    return <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Img url={url} width="58px" height="87px"/>
        <Box sx={{marginLeft: '20px'}}>
            <Typography>{name} <span>({date})</span></Typography>
            <Typography onClick={onClick} sx={{cursor: 'pointer'}}>Back to main</Typography>
        </Box>
    </Box>
}

function Casts({casts, details}) {

    const route = useRouter()
    const {moviesID} = route.query
    const handleBack = () => {
        route.push(`/movies/${moviesID}`)
    }
    return (
        <Box>
            <Box sx={{backgroundColor: 'yellow', justifyContent: 'left', ...containerStyle}}>
                <ItemList url={details.backdrop_path} name={details.original_title}
                          date={details.release_date.substring(0, 4)} onClick={handleBack}/>
            </Box>
            <Box sx={containerStyle}>
                <Box sx={castsStyle}>
                    <Typography sx={headerStyle}>
                        Series casts <span style={{opacity: 0.6}}>({casts.cast.length})</span>
                    </Typography>
                    <Box>
                        {casts.cast.map(item => <ItemCasts item={item}/>)}
                    </Box>
                </Box>
                <Box sx={crewStyle}>
                    <Typography sx={headerStyle}>
                        Series crew <span style={{opacity: 0.6}}>({casts.crew.length})</span>
                        <Box>
                            {getListDepartment(casts.crew).map(item => <ItemCrew list={casts.crew} item={item}/>)}
                        </Box>
                    </Typography>
                </Box>
            </Box>
        </Box>);
}

export default Casts;