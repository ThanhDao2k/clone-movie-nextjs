import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

function MuiTab({list, value, handleChange, children, ...rest}) {

    return (
        <TabContext value={value}>
            <Box {...rest}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    {
                        list.map(item => <Tab label={item.label} value={item.key} key={item.key}/>)
                    }
                </TabList>
            </Box>
            {children}
        </TabContext>
    );
}

export default MuiTab;