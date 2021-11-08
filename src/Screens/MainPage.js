import React, { useCallback, useEffect } from 'react';
import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';

import Header from '../Header/Header';
import Posts from '../Posts/Posts';
import LeftPanelLogged from './../LeftPanelLogged/LeftPanelLogged';
import AddPost from '../Posts/AddPost/AddPost';
import Chats from '../Chats/Chats';
import { Redirect } from 'react-router';

const useStyle = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark
    },
    userPanel: {
        position: 'sticky',
        top: '11.6vh',
        [theme.breakpoints.down('sm')]: {
            position: 'relative',
            top: '0vh'
        },
    },
    posts: {
        position: 'relative'
    },
    chats: {
        position: 'sticky',
        top: '11.6vh',
    }
}))

function MainPage() {
    const classes = useStyle();
    let newObj = {};
    let revObj = {};
    const dispatch = useDispatch();
    const fetchPosts = useCallback(
        () => {
            fetch('https://spacenews-4a56b-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
            .then(response => response.json())
            .then(data => {
                revObj = Object.keys(data).reverse();
                revObj.forEach(function(i) {
                    newObj[i] = data[i];
                  })
                dispatch({type: 'getPosts', posts: newObj})
            })
            .catch(err => console.log(err))
        },
        [],
    )

    useEffect(()=>{
        fetchPosts();
    }, [fetchPosts])

    return (
        <React.Fragment>
            {!localStorage.getItem('username') && <Redirect to='/login' />}
            <Header />
            <Grid className={classes.root} container justifyContent="center" alignItems="flex-start" spacing={2} m={0}>
                <Grid item xs={12} sm={4} justifyContent="center" align="center" className={classes.userPanel}>
                    <LeftPanelLogged />
                </Grid>
                <Grid item xs={10} sm={4}  className={classes.posts}>
                    <AddPost />
                    <Posts />
                </Grid>
                <Grid item xs={12} sm={4}  justifyContent="center" align="center" className={classes.chats}>
                    <Chats />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default MainPage