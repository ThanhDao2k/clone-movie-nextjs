import React, {useState} from 'react';
import MuiMenu from "../components/ui/MuiMenu";
import {items} from "../components/layout/Header";
import MuiTab from "../components/ui/MuiTab";
import {Typography} from "@mui/material";



function Ui(props) {

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>

            <MuiMenu items={items}/>
            <MuiTab list={listTab} value={value} handleChange={handleChange}>
                <Typography>{value}</Typography>
            </MuiTab>
        </div>
    );
}

export default Ui;