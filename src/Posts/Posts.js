import React from 'react';
import { Box } from '@mui/system';
import { Avatar, Button, Grid, TableCell, TableRow, Typography } from '@mui/material';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import pic from './../Img/default_profile.jpg'

const DUMMY_CONTENT=[
    {
    user: 'Marcin Gąszczak',
    picture: pic,
    time: '2hrs ago',
    content: 'just a dummy content for developing',
    key: '1'
},
{
    user: 'Marcin G',
    picture: pic,
    time: '7hrs ago',
    content: 'just a dummy content for developing by someone else',
    key: '2'
}]


function Posts() {
    return (
        DUMMY_CONTENT.map(post => (
            <Box textAlign='center' sx={{ border: 1, borderRadius: 2}} mb={3} key={post.key}>
            <Grid sx={{padding: 2}}>
                <Grid sx={{borderBottom: 1}}>
                    <TableRow >
                        <TableCell sx={{padding: 0, border: 0, paddingBottom: 1}}>
                            <Avatar sx={{ width: 48, height: 48 }} src={post.picture} />
                        </TableCell>
                        <TableCell sx={{padding: 0, paddingLeft: 2, border: 0}}>
                            <Typography>
                                {post.user}
                            </Typography>
                            <Typography variant='subtitle2'>
                            {post.time}
                            </Typography>
                        </TableCell>
                    </TableRow>
                </Grid>
                <Grid sx={{padding: 3}}>{post.content}</Grid>
                <Grid container sx={{borderTop: 1}}>
                    <Grid xs={6}>
                        <Button startIcon={<ModeCommentIcon />} >
                            Comment
                        </Button>
                    </Grid>
                    <Grid xs={6}>
                        <Button startIcon={<ThumbUpIcon />}>
                            Like
                        </Button>
                    </Grid>

                </Grid>

            </Grid>
        </Box>
        ))
    )
}

export default Posts
