import React, {useState} from 'react';
import {useRouter} from "next/router";
import AntMenu from "../ui/antMenu";
import AntButton from "../ui/AntButton";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {Box, IconButton, InputAdornment, TextField} from "@mui/material";

const items = [
    {id: 'home', label: 'Home'},
    {id: 'movies', label: 'movies'},
    {id: 'tvShow', label: 'TV show'},
]

const headerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(3, 37, 65, 1)',
    height: '64px',
    width: '100vw',
    zIndex: 10,
    transition: 'top 0.2s linear',
    padding: '20px'
}
const contentStyle = {
    width: '70vw',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: "center"
}
const btnStyle = {
    width: '200px',
    color: 'white', fontSize: '16px', padding: '8px', fontWeight: 600,
    backgroundColor: 'rgba(3, 37, 65, 1)',
    border: 'none',
    cursor: 'pointer'
}

function Header() {
    const route = useRouter()
    const [selected, setSelected] = useState('')
    const [search, setSearch] = useState('')

    const handleClick = (e) => {
        setSelected(e.key)
        if (e.key !== "home") {
            route.push(`${e.key}`)
        } else {
            route.push("/")
        }
    }
    const handleLogin = () => {
        route.push("/login")
    }
    const handleSearch = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            route.push("/search")
        }
        console.log(e.key)
    }
    return (
        <Box sx={headerStyle}>
            <Box sx={contentStyle}>
                <AntMenu items={items} handleClick={handleClick} selected={selected}/>
                <Box>
                    <AntButton style={btnStyle} onClick={handleLogin}>Đăng nhập</AntButton>
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton edge="end">
                                        <SearchOutlinedIcon sx={{color: 'white'}}/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                        sx={{
                            color: 'white', '& .MuiInputBase-input': {
                                color: 'white'
                            }
                        }}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        onKeyPress={handleSearch}
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default Header;