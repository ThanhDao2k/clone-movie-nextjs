import React, {useState} from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";

const contentStyle = {
    width: '70vw', display: 'flex', justifyContent: 'center', alignItems: "center", flexDirection: 'column'
}
const formStyle = {
    display: 'flex', justifyContent: 'center', alignItems: "center", flexDirection: 'column', gap: 5, width: '50vw'
}
const fetcher = (url) => fetch(url).then(res => res.json())
const url = 'https://api.themoviedb.org/3/authentication/token/new?api_key=e9e9d8da18ae29fc430845952232787c'

function Login({guestSession}) {
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    console.log(userName)
    console.log(password)
    return (<Box sx={contentStyle}>
        <div>Login</div>
        <form onSubmit={handleSubmit}>
            <Box sx={formStyle}>
                <Box sx={{width: '100%'}}>
                    <Typography>Username</Typography>
                    <TextField variant="outlined" sx={{width: '100%'}} value={userName}
                               onChange={e => setUserName(e.target.value)}/>
                </Box>
                <Box sx={{width: '100%'}}>
                    <Typography>Password</Typography>
                    <TextField variant="outlined" sx={{width: '100%'}} value={password}
                               onChange={e => setPassword(e.target.value)}/>
                </Box>
                <Button>Đăng nhập</Button>
                <Button>Reset password</Button>
            </Box>

        </form>
    </Box>);
}

export async function getServerSideProps() {
    const data = await fetcher(url)
    return {
        props: {guestSession: data},
    };
}

export default Login;