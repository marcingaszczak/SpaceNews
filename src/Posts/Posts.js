import React, { useState } from 'react';
import { Box } from '@mui/system';
import { Avatar, Grid, TableCell, TableRow, Typography, Button, Table, Modal, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from "formik";
import * as Yup from 'yup';
import moment from "moment";


import pic from './../Img/default_profile.jpg';
import Like from './Like/Like';
import Comments from './Comments/Comments';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30vw',
    height: '30vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    flexDirection: 'row'
  };

  const validate = Yup.object().shape({
      content: Yup.string()
      .required('Post content must be present')
      .min(3, 'Post must be at least 3 chars long')

  })

function Posts() {
    const [open, setOpen] = useState(false);
    let objectPosts = useSelector(state => state.posts)
    let user = useSelector(state => state.username)
    let state = useSelector(state => state)
    const dispatch = useDispatch()

    //variables for editing post
    const [postData, setPostData] = useState('')
    const [clickedPost, setClickedPost] = useState('a')
    const postNamesArray = Object.keys(objectPosts)
    ////////////////////////////

    //variables for deleting post
    let newObj = {};
    let revObj = {};
    //

    const handleEditClick = (props) => {
        setOpen(true)

        postNamesArray.forEach(post => {
            if(post === props) {
                setClickedPost(post);
                setPostData(objectPosts[props].content)
            }
        })
    }

    const handleCancelClick = () => {
        setOpen(false);
    }

    const handleDeleteClick = (props) =>  {
        fetch(`https://spacenews-4a56b-default-rtdb.europe-west1.firebasedatabase.app/posts/${props}.json`, {
            method: 'DELETE',
            body: null
        })
        .then(response => {
            return response.json( )
        })
        .then(data =>{
            return fetch('https://spacenews-4a56b-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
                .then(response => response.json())
                .then(data => {
                    revObj = Object.keys(data).reverse();
                    revObj.forEach(function(i) {
                        newObj[i] = data[i];
                    })
                    dispatch({type: 'getPosts', posts: newObj})
                })
                .catch(err => console.log('Fetch from database error ' + err))
        });
    }

    return (
        <React.Fragment>
        <Modal
            open={open}>
                <Box sx={style} >
                    <Formik
                    enableReinitialize={true}
                    initialValues={{
                        content: postData,
                    }}
                    validationSchema={validate}
                    onSubmit = {(values, {setSubmitting}) => {
                        //
                        fetch(`https://spacenews-4a56b-default-rtdb.europe-west1.firebasedatabase.app/posts/${clickedPost}.json`,
                        {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                author: state.posts[clickedPost].author,
                                content: values.content,
                                date: state.posts[clickedPost].date,
                                likes: state.posts[clickedPost].likes,
                                likedBy: state.posts[clickedPost].likedBy})
                        })
                        .then(response => response.json())
                        .then(data => {
                            const reduxChangedPost = state.posts;
                            reduxChangedPost[clickedPost].content = values.content
                            console.log(data)
                            dispatch({type: 'getPosts', posts: reduxChangedPost})
                            setOpen(false)
                         })
                        .catch(err => console.log(err))
                        //
                    }}
                    >
                        {({values, handleSubmit, handleChange, touched, errors})=>(
                            <form onSubmit={handleSubmit}>
                                <Box>
                                    <TextField
                                        value={values.content}
                                        onChange={handleChange}
                                        name='content'
                                        error={Boolean(touched.content && errors.content)}
                                        helperText={touched.content && errors.content}
                                        multiline
                                        maxRows={4}
                                        fullWidth/>
                                </Box>
                                <Box sx={{position: 'absolute', right: '1vw', bottom: '1vh'}}>
                                    <Button
                                    type='submit'>
                                        EDIT
                                    </Button>
                                    <Button onClick={handleCancelClick}>CANCEL</Button>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Box>

        </Modal>
        <Box sx={{ marginBottom: 2, padding: 3, width: '100%', bgcolor: 'background.paper'}}>
            {Object.keys(objectPosts).map(post => (
                <Box textAlign='center' sx={{ border: 1, borderRadius: 2, width: '100%'}} mb={3} key={post}>
                <Grid sx={{padding: 2}}>
                    <Grid sx={{borderBottom: 1, width: '100%'}}>
                        <Table>
                            <tbody>
                                <TableRow >
                                    <TableCell sx={{padding: 0, border: 0, paddingBottom: 1, paddingLeft: 1, width: '15%'}}>
                                        <Avatar sx={{ width: 48, height: 48 }} src={pic} />
                                    </TableCell>
                                    <TableCell sx={{padding: 0, border: 0 }} >
                                        <Typography >
                                            {objectPosts[post].author}
                                        </Typography>
                                        <Typography variant='subtitle2'>
                                        {moment(objectPosts[post].date).format("Do MMM YY, h:mm a")}
                                        </Typography>
                                    </TableCell>
                                    {user === objectPosts[post].author &&
                                    <TableCell align="right" sx={{border: 0}}>
                                        <Button onClick={()=> handleEditClick(post)}>EDIT</Button>
                                        <Button onClick={()=> handleDeleteClick(post)}>DELETE</Button>
                                    </TableCell>
                                    }
                                </TableRow>
                            </tbody>
                        </Table>
                    </Grid>
                    <Grid sx={{padding: 3}}>{objectPosts[post].content}</Grid>
                    <Grid container sx={{borderTop: 1}}>
                        <Grid item xs={6}>
                            <Comments />
                        </Grid>
                        <Grid item xs={6}>
                            <Like id={post} likedBy={objectPosts[post].likedBy}/>
                        </Grid>

                    </Grid>

                </Grid>
            </Box>
            ))}
        </Box>

        </React.Fragment>
    )
}

export default Posts
