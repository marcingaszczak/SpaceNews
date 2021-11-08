import React, { useState } from 'react';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import { Avatar, Grid, Typography } from '@mui/material';

import pic from './../Img/default_profile.jpg'


const DUMMY_CONTENT = [
    {username: 'marcingaszczak',
    avatar: pic},
    {username: 'oliver_ayles',
    avatar: pic},
    {username: 'john-brown',
    avatar: pic},
    {username: 'jackholmes',
    avatar: pic},
    {username: 'ben_gale',
    avatar: pic},
    {username: 'henryli',
    avatar: pic},
    {username: 'johnrayner',
    avatar: pic},
    {username: 'colin-smith',
    avatar: pic},
    {username: 'derek.wade',
    avatar: pic}
]

const useStyle = makeStyles((theme) => ({
    chatHeader: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.secondary,
        width: '100%',
        paddingBottom: 2
    },
    mainBox: {
        flexDirection: 'column',
        overflow: 'auto',
        display: 'flex',
        width: '80%',
        height: '75vh',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    modal:{
        backgroundColor: 'rgba(0,0,0, 0.5)',
        width: '25.8vw',
        height: '75vh',
        zIndex: 10,
        position: 'absolute',
        left: '4.15vw',
        top: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            left: '10vw',
            width: '78vw',
            marginLeft: '16px'
        }
    }
}))

function Chats() {
    const classes = useStyle();
    const [modal, setModal] = useState(false)

    const handleChatClick = () => {
        setModal(true)
    }

    return (
        <Box onClick={handleChatClick} className={classes.mainBox} bgcolor='background.paper' textAlign='center'>
            {modal && <Grid className={classes.modal}>
                <Typography sx={{color: '#ffffff', fontSize: 32 }}>
                    Work in progress
                </Typography>
            </Grid>}
            <Grid className={classes.chatHeader}>
                <Grid className={classes.chatHeader}>
                    <Typography sx={{color: '#ffffff'}} ml={4} mt={2}>
                        CHAT
                    </Typography>
                </Grid>
            </Grid>
        {DUMMY_CONTENT.map(user => (
            <Grid sx={{display: 'flex', width: '80%', alignItems: 'flex-start', justifyContent: 'left'}} p={1}>
                <Grid sx={{width: '15%', paddingLeft: 8, paddingRight: 1}}>
                    <Avatar sx={{ width: 48, height: 48 }} src= {user.avatar}/>
                </Grid>
                <Grid >
                    <Typography sx={{paddingLeft: 7, paddingTop: 2}}>
                        {user.username}
                    </Typography>
                </Grid>
            </Grid>
        ))}
        </Box>
    )
}

export default Chats
