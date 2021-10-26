import React from 'react';
import { Box } from '@mui/system';
import { Avatar, Grid, TableCell, TableRow, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import pic from './../Img/default_profile.jpg';
import Like from './Like/Like';
import Comments from './Comments/Comments';


function Posts() {
    const objectPosts = useSelector(state => state.posts)

    return (
        Object.keys(objectPosts).map(post => (
            <Box textAlign='center' sx={{ border: 1, borderRadius: 2}} mb={3} key={post.key}>
            <Grid sx={{padding: 2}}>
                <Grid sx={{borderBottom: 1}}>
                    <TableRow >
                        <TableCell sx={{padding: 0, border: 0, paddingBottom: 1}}>
                            <Avatar sx={{ width: 48, height: 48 }} src={pic} />
                        </TableCell>
                        <TableCell sx={{padding: 0, paddingLeft: 2, border: 0}}>
                            <Typography>
                                {objectPosts[post].author}
                            </Typography>
                            <Typography variant='subtitle2'>
                            {objectPosts[post].date}
                            </Typography>
                        </TableCell>
                    </TableRow>
                </Grid>
                <Grid sx={{padding: 3}}>{objectPosts[post].content}</Grid>
                <Grid container sx={{borderTop: 1}}>
                    <Grid xs={6}>
                        <Comments />
                    </Grid>
                    <Grid xs={6}>
                        <Like id={post} likedBy={objectPosts[post].likedBy}/>
                    </Grid>

                </Grid>

            </Grid>
        </Box>
        ))
    )
}

export default Posts
