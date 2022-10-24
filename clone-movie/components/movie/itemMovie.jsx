import React from 'react';
import Img from "../ui/Img";
import Link from "next/link";
import {Box, Card, CardContent, Typography} from "@mui/material";
import moment from "moment";


function ItemMovie({item}) {
    return (
        <Link href={`/movies/${item.id}`}>
            <Card key={item.id} style={{width: '150px', margin: '10px', cursor: 'pointer'}}>
                <CardContent sx={{
                    "&.MuiCardContent-root": {
                        padding: 0
                    }
                }}>
                    <Img url={` https://image.tmdb.org/t/p/original/${item.poster_path}`} width={150}
                         height={225}/>
                    <Box sx={{padding: '5px 15px'}}>
                        <Typography
                            sx={{fontSize: '16px', fontWeight: 700}}>{item.title}</Typography>
                        <Typography sx={{fontSize: '14px', color: '#989595'}}>{moment(item.release_date).format('MMMM Do YYYY')}</Typography>
                    </Box>
                </CardContent>
            </Card>
        </Link>
    );
}

export default ItemMovie;
