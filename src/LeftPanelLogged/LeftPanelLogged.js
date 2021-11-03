import React from 'react'
import { Avatar, Typography } from '@mui/material'
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';


function LeftPanelLogged() {
    const username = useSelector(state => state.username)
    return (
        <Box sx={{width: '80%', height: '75vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: 'background.paper'}}>
            <Avatar sx={{ width: 100, height: 100 }}/>
            <Typography p={2}>
                {username}
            </Typography>
        </Box>
    )
}

export default LeftPanelLogged

