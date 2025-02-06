import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
const Home = () => {
const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
        <Box sx={{ width: '20%', bgcolor: 'background.paper' }}>
            <Tabs value={value} onChange={handleChange} orientation="vertical">
                <Tab label="Item One" />
                <Tab label="Item Two" />
                <Tab label="Item Three" />
            </Tabs>
        </Box>
        asd
    </div>
  )
}

export default Home
