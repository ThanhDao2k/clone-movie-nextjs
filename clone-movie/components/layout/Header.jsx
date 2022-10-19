import React from 'react';
import {Menu} from "antd"
import {AppstoreOutlined} from '@ant-design/icons';

const items = [
    {key: 'home', label: 'Home', icon: <AppstoreOutlined/>},
    {key: 'movies', label: 'movies', icon: <AppstoreOutlined/>},
    {key: 'tvShow', label: 'TV show'},
]

const menuStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    top: 0,
    left: 0,
    maxWidth: '400px',
    width: '100%',
    padding: '0 40px',
    cursor: 'pointer',
    color: 'white',
    listStyleType: 'none'
}
const headerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(3, 37, 65, 1)',
    height: '64px',
    width: '100vw',
    zIndex: 10,
    transition: 'top 0.2s linear',
}

function Header(props) {

    const handleClick = (e) => {
        if (e.key === "home") {

            window.location.href = `http://localhost:3000`
        }
        window.location.href = `http://localhost:3000/${e.key}`
    }
    return (
        <div style={headerStyle}>
            <Menu items={items} style={menuStyle} onClick={handleClick}/>
            <div>
                <button>login</button>

            </div>
        </div>
    );
}

export default Header;