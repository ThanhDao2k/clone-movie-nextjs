import React, {useState} from 'react';
import {useRouter} from "next/router";
import AntButton from "../ui/AntButton";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {Box, Button, IconButton, InputAdornment, TextField} from "@mui/material";
import MuiMenu from "../ui/MuiMenu";
import {removeLocalStorage} from "../Logic/common";
import {listMenu} from "../Logic/listKey";


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

function Header({isSuccess}) {
    const route = useRouter()
    const [search, setSearch] = useState('')

    const handleLogin = () => {
        route.push("/login")
    }
    const handleSearch = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            route.push("/search")
        }
    }

    console.log(route)
    const onClickItemChildren = (key) => {
        if (key.substring(0, 3) === "tv_") {
            route.push(`/tvShow/${key.substring(3)}`)
        } else {

            route.push(`/movies/${key}`)
        }
    }
    const onClickItem = (key) => {
        if (key !== "home") {
            route.push(`${key}`)
        } else {
            route.push("/")
        }
    }
    const handleLogout = () => {
        removeLocalStorage('authentication')
        removeLocalStorage('session_id')
        route.push("/")
    }
    return (
        <Box sx={headerStyle}>
            <Box sx={contentStyle}>
                <MuiMenu items={listMenu} onClickItemChildren={onClickItemChildren} onClickItem={onClickItem}/>
                <Box>
                    {
                        isSuccess ? <Button onClick={handleLogout}>Đăng xuất</Button> :
                            <AntButton style={btnStyle} onClick={handleLogin}>Đăng nhập</AntButton>
                    }
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