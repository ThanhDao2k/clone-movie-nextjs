import React, {useEffect} from 'react';
import Header from "./Header";
import Footer from "./footer";
import {Box} from "@mui/material";
import {getLocalStorage} from "../Logic/common";

const containerStyle = {
    position: 'absolute',
    top: '64px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
}

function Layout({children}) {
    const d = getLocalStorage('authentication')
    return (
        <Box style={{position: 'relative', width: '100vw', height: '100vh'}}>
            <Header isSuccess={d && d?.success}/>
            <Box style={containerStyle}>
                {children}
            </Box>
            <Footer/>
        </Box>
    );
}

export default Layout;