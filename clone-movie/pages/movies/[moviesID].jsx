import React from 'react';
import Img from "../../components/ui/Img";
import {Box, Typography} from "@mui/material";
import {changeTime} from "../../components/Logic/common";
import ItemCasts from "../../components/casts/ItemCasts";

export const getStaticPaths = async () => {
    const res = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US&page=2');
    const data = await res.json();
    const paths = data?.results.map(movie => {
        return {
            params: {moviesID: movie.id.toString()}
        }
    })

    return {
        paths,
        fallback: false
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

    return {
        props: {movie: data.results, video: data1.results, details: details, casts: casts.cast}
    }
}

function movie({movie, video, details, casts}) {
    // const {author, url, content, author_details} = movie[0]
    console.log(video)
    console.log(movie)
    console.log(details)
    console.log("casts: ", casts)
    const castsSort = casts.sort((a, b) => b.popularity - a.popularity)
    const newCasts = castsSort.filter(casts => casts.popularity > 15)
    return (
        <>
            {
                movie ?
                    <Box
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
                                <Img url={` https://image.tmdb.org/t/p/original/${details.backdrop_path}`} width='300px'
                                     height='450px'/>
                                <Box sx={{marginLeft: '30px', width: '400px'}}>
                                    <Typography color="white"
                                                sx={{
                                                    fontSize: '35px',
                                                    fontWeight: 700
                                                }}>{details.original_title}
                                        <span> ({details.release_date.substring(0, 4)})</span></Typography>
                                    <Typography color="white" sx={{listStyleType: 'circle'}}>{details.genres.map(item =>
                                        <span> {item.name}, </span>)}
                                        <span>{changeTime(details.runtime)}</span></Typography>
                                    <Typography color="white"
                                                sx={{fontSize: '21px', fontWeight: 500}}>Overview</Typography>
                                    <Typography color="white">{details.overview}</Typography>
                                    <Typography color="white">{details.release_date
                                    }</Typography>
                                    <Typography color="white">{details.vote_average}</Typography>
                                    <Typography color="white">{details.vote_count}</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{padding: '30px 40px'}}>

                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'column', width: '70vw'}}>
                            <Typography sx={{fontSize: '22px', fontWeight: 600, marginBottom: '20px'}}>Top Billed
                                Cast</Typography>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '50vw',
                                overflowX: 'auto'
                            }}>
                                {
                                    newCasts.map(cast => <ItemCasts item={cast}/>)
                                }
                            </Box>
                        </Box>
                        <iframe
                            src={`https://www.youtube.com/embed/${video[0].key}?autoplay=1`}
                            allow="autoplay"
                            className="watch__left-content"></iframe>
                        {/*<Img url={` https://image.tmdb.org/t/p/original/${author_details?.avatar_path}`} width={150}*/}
                        {/*     height={150}/>*/}
                        {/*<h2>{author}</h2>*/}
                        {/*<a href={url}>{author}</a>*/}
                        {/*<p>{content}</p>*/}
                    </Box> : <div>khong co thong tin</div>
            }
        </>
    )
}

export default movie;