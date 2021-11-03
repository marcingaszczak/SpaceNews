import React from 'react';
import { Box } from '@mui/system';
import { Button, Grid, TextField } from '@mui/material';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import moment from "moment";

const validate = Yup.object().shape({
    content: Yup.string()
    .required('Post content is required')
    .min(3, 'Post must be at least 3 characters long')
    .max(2000, 'Post is too long'),
})

function AddPost() {
    const username = useSelector(state => state.username)
    const dispatch = useDispatch();
    let newObj = {};
    let revObj = {};

    return (
        <React.Fragment>
            <Box sx={{width: '100%', bgcolor: 'background.paper'}} p={3} mb={3} mt={3}>
                <Box textAlign='center' sx={{ width: '100%'}} >
                    <Formik
                    initialValues={{
                        author: '',
                        content: '' ,
                        date: '',
                        likes: 0
                    }}
                    validationSchema = {validate}
                    onSubmit = {(values, { setSubmitting, setTouched }) => {
                        const currentTime = parseInt(moment().format('X'));
                        const timerTime = moment.unix(currentTime).utc();
                        fetch(`https://spacenews-4a56b-default-rtdb.europe-west1.firebasedatabase.app/posts.json`,
                            {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    author: username,
                                    content: values.content,
                                    date: timerTime,
                                    likes: 0})
                            })
                            .then(response => response.json())
                            .then(data => {
                                console.log(values.content)
                                values.content = ''
                                return fetch('https://spacenews-4a56b-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
                                    .then(response => response.json())
                                    .then(data => {
                                        revObj = Object.keys(data).reverse();
                                        setSubmitting(false);
                                        setTouched(false);
                                        revObj.forEach(function(i) {
                                            newObj[i] = data[i];
                                            console.log(newObj)
                                        })
                                        dispatch({type: 'getPosts', posts: newObj})
                                        newObj={}
                                    })
                                    .catch(err => console.log('Fetch from database error ' + err))
                            })
                            .catch(err => console.log('Fetch to database error ' +err))
                        }
                    }
                    >
                        {({ values, handleSubmit, isSubmitting, touched, errors, handleChange }) => (
                            <form onSubmit = {handleSubmit}>
                                <Grid container sx={{padding: 2}}>
                                    <Grid item xs={9} container>
                                        <TextField
                                            fullWidth
                                            name='content'
                                            label='Content'
                                            error={Boolean(touched.content && errors.content)}
                                            helperText={touched.content && errors.content}
                                            onChange={handleChange}
                                            value={values.content}/>
                                    </Grid>
                                    <Grid item xs={3} container alignItems='center' justifyContent='center'>
                                        <Button
                                        type='submit'
                                        disabled={isSubmitting}>
                                            Add
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default AddPost
