import React from 'react';
import Header from "./Header";
import Footer from "./footer";

function Layout({children}) {
    return (
        <div style={{position: 'relative'}}>
            <Header/>
            <div style={{position: 'absolute', top: '64px'}}>
                {children}
            </div>
            <Footer/>
        </div>
    );
}

export default Layout;