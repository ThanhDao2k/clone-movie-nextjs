import React, {useState} from 'react';
import Img from "../../../components/ui/Img";
import {Box, IconButton, Typography} from "@mui/material";
import {changeTime, convertObjectToArray, getLocalStorage} from "../../../components/Logic/common";
import ItemCasts from "../../../components/casts/ItemCasts";
import {useRouter} from "next/router";
import MuiRate from "../../../components/ui/MuiRate";
import MuiTab from "../../../components/ui/MuiTab";
import MuiAvatar from "../../../components/ui/MuiAvatar";
import {listSocialNetWorks, listTab} from "../../../components/Logic/listKey";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";
import {apiKey, baseUrl} from "../../../components/api/listUrl";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import {postFetcher} from "../../login";

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
    const res = await fetch('https://api.themoviedb.org/3/movie/' + id + '/reviews?api_key=e9e9d8da18ae29fc430845952232787c');
    const data = await res.json();
    const res1 = await fetch('https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US');
    const data1 = await res1.json();
    const data2 = await fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=e9e9d8da18ae29fc430845952232787c&append_to_response=videos')
    const details = await data2.json()
    const data3 = await fetch('http://api.themoviedb.org/3/movie/' + id + '/casts?api_key=e9e9d8da18ae29fc430845952232787c')
    const casts = await data3.json()
    const data4 = await fetch('https://api.themoviedb.org/3/movie/' + id + '/recommendations?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US&page=1')
    const recommendations = await data4.json()
    const socialNetWork = await fetch(`${baseUrl}/movie/${id}/external_ids?api_key=${apiKey}`)
    const listSocialNetWork = await socialNetWork.json()

    return {
        props: {
            movie: data.results,
            video: data1.results,
            details: details,
            casts: casts.cast,
            recommendations: recommendations.results,
            listSocialNetWork
        }
    }
}
const ReviewFilm = ({item}) => {
    const {author_details, content, created_at} = item
    return <Box
        sx={{display: 'flex', flexDirection: 'row', alignItems: 'top', marginBottom: '10px', marginTop: '10px'}}>
        <MuiAvatar url={author_details.avatar_path} width='56px' height="56px"/>
        <Box sx={{marginLeft: '20px'}}>
            <Typography sx={{fontSize: '16px', fontWeight: 600}}>{author_details.username}</Typography>
            {author_details.rating && <MuiRate value={author_details.rating} precision="1" size="small"/>}
            <Typography>{moment(created_at).format('DD/MM/YYYY')}</Typography>
            <Typography sx={{paddingTop: '10px', fontSize: '14px'}}>{content}</Typography>
        </Box>
    </Box>
}
const ItemSocialNetwork = ({item, onClick}) => {
    const {icon, key, baseUrl} = item
    return <IconButton key={key} onClick={onClick?.({baseUrl, key})}>
        {icon}
    </IconButton>
}

function movie({movie, details, casts}) {
    const route = useRouter()
    const castsSort = casts.sort((a, b) => b.popularity - a.popularity)
    const newCasts = castsSort.filter(casts => casts.popularity > 15)

    const [value, setValue] = useState(listTab[0].key);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleClick = (data) => {
        // const fil = convertObjectToArray(listSocialNetWork).filter(item => item.name === data.key)
        console.log("data: ", data)
        // console.log("fil: ", fil)
        // if (typeof window !== 'undefined' && fil) {
        //     window.open(`${data.baseUrl}/${fil[0].id}`)
        // }
    }
    const account_id = getLocalStorage('account_id')
    const session_id = getLocalStorage('session_id')
    const {moviesID} = route.query
    const handleFavorite = () => {
        const param = {media_type: 'movie', media_id: moviesID, favorite: true}
        console.log(param)
        postFetcher(`${baseUrl}account/${account_id}/favorite?api_key=${apiKey}&session_id=${session_id}`, param).then(r => console.log(r))
    }
    return (<>
        {movie ? <Box
            sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <Box sx={{
                backgroundImage: 'linear-gradient(to right, rgba(31.5, 10.5, 10.5, 1) 150px, rgba(31.5, 10.5, 10.5, 0.84) 100%)',
                width: '100vw'
            }}>
                <Box sx={{
                    padding: '30px 40px',
                    width: '70vw',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Img url={details.backdrop_path} width='300px'
                         height='450px'/>
                    <Box sx={{marginLeft: '30px', width: '400px'}}>
                        <Typography color="white"
                                    sx={{
                                        fontSize: '35px', fontWeight: 700
                                    }}>{details.original_title}
                            <span> ({details.release_date.substring(0, 4)})</span></Typography>
                        <Typography color="white" sx={{listStyleType: 'circle'}}>{details.genres.map(item =>
                            <span> {item.name}, </span>)}
                            <span>{changeTime(details.runtime)}</span></Typography>
                        <Typography color="white"
                                    sx={{fontSize: '21px', fontWeight: 500}}>Overview</Typography>
                        <Typography color="white">{details.overview}</Typography>
                        <Typography color="white">{details.release_date}</Typography>
                        <MuiRate value={details.vote_average} precision="0.001"/>
                        <Typography color="white">Vote: {details.vote_count}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{padding: '30px 40px'}}>

            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: '10px', width: '70vw'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', width: '50vw'}}>
                    <Box sx={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '50vw'
                    }}>
                        <Typography sx={{fontSize: '22px', fontWeight: 600, marginBottom: '20px'}}>Series
                            Cast</Typography>
                        <Typography
                            sx={{
                                fontSize: '14px', fontWeight: 600, marginBottom: '20px', cursor: 'pointer'
                            }}
                            color="blue"
                            onClick={() => {
                                const {moviesID} = route.query
                                route.push(`/movies/${moviesID}/Casts`)
                            }}>
                            Xem thêm
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex', flexDirection: 'row', width: '50vw', overflowX: 'auto'
                    }}>
                        {newCasts.map(cast => <ItemCasts item={cast}/>)}
                    </Box>
                </Box>
                <Box sx={{flex: 1}}>
                    <Typography>Thông tin</Typography>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <IconButton onClick={handleFavorite}><FavoriteBorderOutlinedIcon/></IconButton>
                    </Box>
                    <Box
                        sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '20px'}}>
                        {listSocialNetWorks.map(item => <ItemSocialNetwork
                            item={item} onClick={handleClick}/>)}
                    < /Box>
                </Box>
            </Box>

            <Box>
                <MuiTab list={listTab} value={value} handleChange={handleChange}>
                    <TabPanel value="review">
                        <Box sx={{
                            width: '70vw', display: 'flex', flexDirection: 'column',
                        }}>
                            {movie.map(item => <ReviewFilm item={item}/>)}
                        </Box>
                    </TabPanel>
                    <TabPanel value="tab2">
                        <Box>
                            hihi
                        </Box>
                    </TabPanel>
                </MuiTab>
            </Box>
            {/*<iframe*/}
            {/*    src={`https://www.youtube.com/embed/${video[0].key}?autoplay=0`}*/}
            {/*    allow="autoplay"*/}
            {/*    className="watch__left-content"></iframe>*/}
        </Box> : <div>khong co thong tin</div>}
    </>)
}

export default movie;