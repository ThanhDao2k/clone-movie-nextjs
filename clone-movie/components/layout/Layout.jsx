import React from 'react';
import Header from "./Header";
import Footer from "./footer";

const containerStyle = {
    position: 'absolute',
    top: '64px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
}
const contentStyle = {
    width: '70vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center"
}

function Layout({children}) {
    return (
        <div style={{position: 'relative', width: '100vw', height: '100vh'}}>
            <Header/>
            <div style={containerStyle}>
                <div style={contentStyle}>
                    {children}</div>
            </div>
            <Footer/>
        </div>
    );
}

export default Layout;