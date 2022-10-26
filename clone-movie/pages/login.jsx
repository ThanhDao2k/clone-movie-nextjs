import React, {useState} from 'react';
import {Box, Button, Card, IconButton, InputAdornment, OutlinedInput, TextField, Typography} from "@mui/material";
import * as yup from "yup"
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup'
import {useRouter} from "next/router";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {setLocalStorage} from "../components/Logic/common";

const contentStyle = {
    width: '70vw', display: 'flex', justifyContent: 'center', alignItems: "center", flexDirection: 'column'
}
const formStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center",
    flexDirection: 'column',
    gap: 5,
    width: '50vw',
    height: '100%'
}
const fetcher = (url) => fetch(url).then(res => res.json())
const url = 'https://api.themoviedb.org/3/authentication/token/new?api_key=e9e9d8da18ae29fc430845952232787c'
const urlLogin = 'https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=c32124e2da2fe228e1a6a1ad3f4447b8'

const SignupSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
});
const postFetcher = (url, data) => fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
}).then(res => res.json())

function Login({guestSession, urlGuestSession}) {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(SignupSchema)
    });
    const {request_token} = guestSession

    const router = useRouter()
    const onSubmit = data => {
        const params = {request_token, ...data}
        postFetcher(urlLogin, params).then(r => {
            if (r.success) {
                setLocalStorage('authentication', r)
                router.push('/')
            } else {
                window.alert(r.status_message)
            }
        })
    }
    const [isShow, setIsShow] = useState(false)
    const handleClickShowPassword = () => {
        setIsShow(!isShow)
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <Box sx={{flex: 1}}>
            <Card sx={contentStyle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={formStyle}>
                        <Box sx={{marginTop: '50px'}}><Typography sx={{fontSize: '50px', fontWeight: 600}}
                                                                  color="blue">Login</Typography></Box>
                        <Box sx={{width: '100%'}}>
                            <Typography>Username</Typography>
                            <TextField variant="outlined" sx={{width: '100%'}}  {...register("username")}/>
                            {
                                errors?.username && <Typography color="error">{errors?.username?.message}</Typography>
                            }
                        </Box>
                        <Box sx={{width: '100%'}}>
                            <Typography>Password</Typography>
                            <OutlinedInput variant="outlined" sx={{width: '100%'}}  {...register("password")}
                                           type={isShow ? "text" : "password"}
                                           endAdornment={
                                               <InputAdornment position="end">
                                                   <IconButton
                                                       onClick={handleClickShowPassword}
                                                       onMouseDown={handleMouseDownPassword}
                                                       edge="end"
                                                   >
                                                       {isShow ? <VisibilityOff/> : <Visibility/>}
                                                   </IconButton> </InputAdornment>}/>
                            {errors?.password &&
                                <Typography color="error">{errors?.password?.message}</Typography>}

                        </Box>
                        <Button type="submit" variant='outlined'>Đăng nhập</Button>
                        <Button variant='outlined'>Reset password</Button>
                    </Box>
                </form>
            </Card>
        </Box>

    )
        ;
}

export async function getServerSideProps() {
    const data = await fetcher(url)
    return {
        props: {guestSession: data},
    };
}

export default Login;