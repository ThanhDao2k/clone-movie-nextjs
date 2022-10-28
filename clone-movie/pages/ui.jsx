import React, {useState} from 'react';
import {Box, Button, FormControl, Select} from "@mui/material";

const names = ['hihi', 'haha', 'kiki',]

function Ui(props) {
    const [personName, setPersonName] = useState([]);
    const handleChangeMultiple = (event) => {
        const {options} = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setPersonName(value);
    };
    const [open, setOpen] = useState(false)

    return (
        <Box>
            <FormControl>
                <Button>test</Button>
                <Select multiple
                        native
                        value={personName}
                        onChange={handleChangeMultiple}
                        label="Native"
                        inputProps={{
                            id: 'select-multiple-native',
                        }}>
                    {names.map((name) => (
                        <option key={name} value={name}>
                            {name}
                        </option>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

export default Ui;