import { AppBar, Button, Toolbar, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { GiRocketFlight } from 'react-icons/gi'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';



function Header() {
    const isLoggedIn = useSelector(state => state.isLoggedIn)
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.setItem('token', '')
        localStorage.setItem('email', '')
        localStorage.setItem('username', '')
        localStorage.setItem('isLoggedIn', false)
        dispatch({type: 'logout'})
    }

    return (
        <AppBar p={1} color='primary' position='sticky' sx={{height: '4rem'}}>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }} >
                    <Box component={Link} to='/'>
                    <GiRocketFlight size='2rem' color='#eeeeee'/>
                    </Box>
                </Box>
                {!isLoggedIn && (
                    <Grid container justifyContent="flex-end">
                         <Box mr={3}>
                            <Button component={Link} to='/' size='large' color="inherit">Login</Button>
                        </Box>
                        <Box mr={3}>
                            <Button component={Link} to='/signIn' size='large' color="inherit">Sign In</Button>
                        </Box>
                    </Grid>
                )}
                {isLoggedIn && (
                    <Box mr={3}>
                        <Button onClick={handleLogout} component={Link} to='/' size='large' color="inherit">Logout</Button>
                    </Box>
                )}
            </Toolbar>

        </AppBar>
    )
}

export default Header

