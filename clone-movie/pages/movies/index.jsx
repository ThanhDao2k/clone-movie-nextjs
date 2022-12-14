import React from 'react';
import ItemMovie from "../../components/movie/itemMovie";

const fetcher = (url) => fetch(url).then(res => res.json())
const url = 'https://api.themoviedb.org/3/movie/popular?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US&page=2'

function Index({list}) {
    return (
        <div>
            <div>list</div>
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: "wrap"}}>
                {
                    list.map(item => {
                        return <div key={item.id}><ItemMovie item={item}/></div>
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

export default Index;