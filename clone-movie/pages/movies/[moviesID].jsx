import React from 'react';
import Img from "../../components/ui/Img";

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

    return {
        props: {movie: data.results, video: data1.results}
    }
}

function movie({movie, video}) {
    const {author, url, content, author_details} = movie[0]
    return (
        <>
            {
                movie ?
                    <div>
                        <iframe
                            src={`https://www.youtube.com/embed/${video[0].key}?autoplay=1`}
                            allow="autoplay"
                            className="watch__left-content"></iframe>
                        <Img url={` https://image.tmdb.org/t/p/original/${author_details?.avatar_path}`} width={150}
                             height={150}/>
                        <h2>{author}</h2>
                        <a href={url}>{author}</a>
                        <p>{content}</p>
                    </div> : <div>khong co thong tin</div>
            }
        </>
    )
}

export default movie;