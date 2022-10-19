import React from 'react';
import Img from "../components/ui/Img";
import AntCard from "../components/ui/antCard";

const fetcher = (url) => fetch(url).then(res => res.json())
const url = 'https://api.themoviedb.org/3/movie/popular?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US&page=2'

function Home({list}) {
    console.log(list)
    return (
        <div>
            <div>list popular</div>
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: "wrap"}}>
                {
                    list.map(item => {
                        return <AntCard key={item.id} style={{width: '100px', margin: '20px'}}>
                            <Img url={` https://image.tmdb.org/t/p/original/${item.poster_path}`} width={100}
                                 height={100}/>
                            <p>{item.title}</p>
                        </AntCard>
                    })
                }

            </div>
        </div>
    );
}

export async function getStaticProps() {
    const data = await fetcher(url)
    return {
        props: {list: data.results},
    };
}

export default Home;