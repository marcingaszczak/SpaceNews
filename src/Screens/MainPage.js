import React, { useCallback, useEffect } from 'react';
import { Grid } from '@mui/material'
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';

import Header from '../Header/Header';
import Posts from '../Posts/Posts';
import LeftPanelLogged from './../LeftPanelLogged/LeftPanelLogged';

const useStyle = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        height: "100vh",
    },
    userPanel: {
        position: 'sticky',
        top: '5rem'
    }
}))

function MainPage() {
    const classes = useStyle();

    const dispatch = useDispatch();
    const fetchPosts = useCallback(
        () => {
            fetch('https://spacenews-4a56b-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
            .then(response => response.json())
            .then(data => {
                dispatch({type: 'getPosts', posts: data})
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
            <Header />
            <Grid className={classes.root} container spacing={2} m={0}>
                <Grid item xs={4} className={classes.userPanel}>
                    <LeftPanelLogged />
                </Grid>
                <Grid item xs={4}>
                    <Posts />
                </Grid>
                <Grid item xs={4}>
                    <Box textAlign='center'>
                    subscribe
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default MainPage


// //stuff used to set username but I have to find better way to implement it

// // import { useSelector } from 'react-redux';
// // import * as Yup from 'yup'
// // import { useDispatch } from 'react-redux';

// // const validate = Yup.object().shape({
// //     username: Yup.string()
// //     .max(255, 'Username is too long'),
// // })

// // const dispatch = useDispatch();
// // const state = useSelector(state => state);

// // const handleClose = () => {
// //     console.log('zmkniecie')
// // }

// {/* <Modal
//             open={state.username === ''}
//             onClose = {handleClose}>
//                 <Formik
//                     initialValues= {{
//                         username: '',
//                         email: ''
//                     }}
//                     validationSchema= {validate}
//                     onSubmit = {(values, {setSubmitting}) => {
//                         fetch('https://spacenews-4a56b-default-rtdb.europe-west1.firebasedatabase.app/users.json',
//                         {
//                             method: 'POST',
//                             body: JSON.stringify({
//                                 username: values.username,
//                                 email: state.email
//                             }),
//                             headers: {
//                                 'Content-Type': 'application/json'
//                             }
//                         }).then(res => {
//                             if(res.ok) {
//                                 setSubmitting(false)
//                                 return res.json()
//                             } else {
//                                 return res.json().then(data => {
//                                     let errorMessage = 'Authentication failed!';
//                                     if(data && data.error && data.error.message) {
//                                         errorMessage = data.error.message
//                                     }
//                                     setSubmitting(false);
//                                     throw new Error(errorMessage)
//                                 })
//                             }
//                         })
//                         .then((data) => {
//                             console.log(data)
//                             dispatch({type: 'addUsername', userInfo: values.username})
//                             localStorage.setItem('username', values.username)
//                         })
//                         .catch((err) => {
//                             alert(err.message)
//                         })
//                     }}
//                 >
//                     {({ values, handleSubmit, touched, errors, handleChange, isSubmitting }) => (
//                         <form onSubmit={handleSubmit}>

//                     <Box m={4}>
//                         <TextField
//                             color='secondary'
//                             variant='outlined'
//                             label='Username'
//                             name='username'
//                             error={Boolean(touched.username && errors.username)}
//                             helperText={touched.username && errors.username}
//                             onChange={handleChange}
//                             value={values.username}/>
//                     </Box>
//                     <Button
//                         variant="outlined"
//                         type='submit'
//                         size='large'
//                         disabled={isSubmitting}
//                         sx={{color: '#ffffff', border: '1px solid #ffffff'}}>
//                         Confirm
//                     </Button>
//                     </form>
//                     )}
//                 </Formik>
//             </Modal> */}