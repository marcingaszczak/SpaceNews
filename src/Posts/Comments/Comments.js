import React from 'react';
import { Box } from '@mui/system';
import { Avatar, Button, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';

import pic from './../../Img/default_profile.jpg';
import { Formik } from 'formik';

const DUMMY_CONTENT = {
    0: {author: 'marcingaszczak',
    content: 'this is my comment'},
    1: {author: 'tester',
    content: 'secound comment'},
    2: {author: 'user',
    content: 'third comment'}
}

const useStyle = makeStyles((theme) => ({
    root: {
        marginTop: '1vh',
        width: '100%'
    },
    form: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '2vh !important',
        backgroundColor: theme.palette.background.dark,
        borderRadius: '10px',
        padding: '8px'
    },
    textfield: {
        width: '70%',
    },
    commentsContainer: {
        textAlign: 'left',
        marginTop: '10px',
        padding: '3px',
        backgroundColor: theme.palette.background.dark,
        borderRadius: '10px'
    },
    commentHeader: {
        display: 'flex',
        alignItems: 'center'
    }
}))

const validate = Yup.object().shape({
    content: Yup.string()
    .max(255, 'Comment is too long')
})

function Comments(props) {
    const classes = useStyle();
    const state = useSelector(state => state)
    const dispatch = useDispatch();
    const postId = props.id;

    const postNamesArray = Object.keys(state.posts);
    let clickedPost = '';

    const comments = state.posts[postId].comments ? Object.keys(state.posts[postId].comments).map(comment => (
        <Box className={classes.commentsContainer} key={postId}>
            <Box className={classes.commentHeader}>
                <Avatar sx={{ width: 30, height: 30, mr:1 }}  src={pic} />
                <Typography sx={{fontSize: 12, fontWeight: 'bold'}}>
                    {state.posts[postId].comments[comment].author}
                </Typography>
            </Box>
            <Typography sx={{ml:5, fontSize: 15}}>
                {state.posts[postId].comments[comment].content}
            </Typography>
        </Box>
    )) : null

    return (
        <Box className={classes.root}>
            <Formik
                initialValues={{
                    comment: ''
                }}
                validationSchema={validate}
                onSubmit = {(values, { setSubmitting }) => {
                    const id = uuidv4();
                    //finding out which add button was clicked
                    postNamesArray.forEach(post => {
                        if(post === postId) {
                            clickedPost = post;
                        } else return;
                    })

                    //figuring out who is writing comment
                    const newComments = Number(state.posts[clickedPost].commentsAmount + 1);
                    let comments = {};
                    if(state.posts[clickedPost].comments === undefined) {
                        comments = [{author: state.username, content: values.comment, id: id}]
                    } else {
                        comments = [...state.posts[clickedPost].comments, {author: state.username, content: values.comment, id: id}]
                    }
                    fetch(`https://spacenews-4a56b-default-rtdb.europe-west1.firebasedatabase.app/posts/${clickedPost}.json`,
                        {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                author: state.posts[clickedPost].author,
                                content: state.posts[clickedPost].content,
                                date: state.posts[clickedPost].date,
                                likes: state.posts[clickedPost].likes,
                                likedBy: state.posts[clickedPost].likedBy,
                                commentsAmount: newComments,
                                comments: comments,
                                toggleComments: false
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            const reduxComments = state.posts;
                            //comments
                            reduxComments[clickedPost].comments = comments;
                            //number of comments
                            reduxComments[clickedPost].commentsAmount = newComments
                            dispatch({type: 'like', userInfo: reduxComments})
                            values.comment = '';
                            setSubmitting(false)
                        })
                        .catch(err => console.log(err))
                }
                }
            >
            {({ values, handleChange, handleSubmit, touched, errors, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                    <Box className={classes.form}>
                        <TextField
                            size='small'
                            className={classes.textfield}
                            label='Comment'
                            name='comment'
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.emial && errors.email}
                            onChange={handleChange}
                            value={values.comment}/>
                        <Button
                        sx={{width: '25%'}}
                        type='submit'
                        size='large'
                        disabled={isSubmitting}>
                            Add
                        </Button>
                    </Box>
                </form>
            )}
            </Formik>
            <Box >
                {/* {state.posts[postId].likes && {Object.keys(DUMMY_CONTENT).map(comment => (
                    <Box className={classes.commentsContainer} key={postId}>
                        <Box className={classes.commentHeader}>
                            <Avatar sx={{ width: 30, height: 30, mr:1 }}  src={pic} />
                            <Typography>
                                {DUMMY_CONTENT[comment].author}
                            </Typography>
                        </Box>
                        <Typography sx={{ml:5}}>
                            {DUMMY_CONTENT[comment].content}
                        </Typography>
                    </Box>
                ))}} */}
                {comments}
            </Box>

        </Box>
    )
}

export default Comments
