import React from 'react';
import { Box } from '@mui/system';

import pic from './../Img/default_profile.jpg'

const DUMMY_CONTENT = [
    {username: 'marcingaszczak',
    avatar: pic},
    {username: 'oliver_ayles',
    avatar: pic},
    {username: 'john-brown',
    avatar: pic}
]

function Chats() {
    return (
        <Box bgcolor='background.paper' sx={{display: 'flex', width: '80%', height: '75vh',justifyContent: 'center', alignItems: 'center'}} textAlign='center'>
            asd
        </Box>
    )
}

export default Chats
