import React from 'react';
import Img from "../ui/Img";
import AntCard from "../ui/antCard";
import Link from "next/link";


function ItemMovie({item}) {
    return (
        <Link href={`/movies/${item.id}`} >
            <div key={item.id} style={{width: '100px', margin: '20px', cursor: 'pointer'}}>
                <Img url={` https://image.tmdb.org/t/p/original/${item.poster_path}`} width={100}
                     height={100}/>
                <p>{item.title}</p>
            </div>
        </Link>
    );
}

export default ItemMovie;
