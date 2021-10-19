import React from 'react';
import { Button, Container, Grid, TextField } from '@mui/material'
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles'
import { Formik } from "formik";
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Header from '../Header/Header';




const useStyle = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        height: "100vh",
        color: 'rgb(255, 255, 255)'
    },
    container: {
        backgroundColor: theme.palette.primary.main,
        height: '70vh',
        marginTop: '8vh',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '20px',
    }
}))

const validate = Yup.object().shape({
    email: Yup.string().email('Insert correct email address')
    .required('Email address is required')
    .max(255, 'Email is too long'),
    password: Yup.string()
    .required('Please Enter your password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase and One Number"),
      passwordConfirmation: Yup.string()
     .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

function SignIn() {
    const classes = useStyle();
    const dispatch = useDispatch();
    const history = useHistory();


    return (
        <React.Fragment>
            <Header />
            <Grid className={classes.root} container spacing={2} m={0}>
                <Grid item xs={12} alignItems='center' justifyContent='center' textAlign='center'>
                    <Formik
                    initialValues={{
                        emial: '',
                        password: '',
                        passwordConfirmation: ''
                    }}
                    validationSchema={validate}
                    onSubmit= {(values, { setSubmitting }) => {
                        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCbmKlCmU85fhjeyxZm3CFVlt3e1WJSDSM',
                        {
                            method: 'POST',
                            body: JSON.stringify({
                                email: values.email,
                                password: values.password,
                                returnSecureToken: true
                            }),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                            }
                        ).then(res => {
                            if(res.ok) {
                                setSubmitting(false);
                                return res.json()
                            } else {
                                return res.json().then(data => {
                                    let errorMessage = 'Authentication failed!';
                                    if(data && data.error && data.error.message) {
                                        errorMessage = data.error.message
                                    }
                                    setSubmitting(false);
                                    throw new Error(errorMessage)
                                })
                            }
                        })
                        .then((data) => {
                            dispatch({type: 'signIn', userInfo: {...data, username: data.email.split('@', 1)[0]}})
                            localStorage.setItem('token', data.idToken)
                            localStorage.setItem('email', values.email)
                            localStorage.setItem('isLoggedIn', true)
                            localStorage.setItem('username', data.email.split('@', 1)[0])
                            history.replace('/main')
                        })
                        .catch((err) => {
                            alert('asd' + err.message)
                        })}
                    }>
                        {({ values, handleChange, handleSubmit, touched, errors, isSubmitting }) => (
                            <form onSubmit={handleSubmit}>
                                <Container maxWidth='sm' className={classes.container} justify='center'>
                                <Box p={2}>
                                    <Box m={4}>
                                        <TextField
                                            color='secondary'
                                            variant='outlined'
                                            label='Email'
                                            name='email'
                                            error={Boolean(touched.email && errors.email)}
                                            helperText={touched.emial && errors.email}
                                            onChange={handleChange}
                                            value={values.email}/>
                                    </Box>
                                    <Box m={4}  >
                                        <TextField  sx={{ width: '50%' }}
                                        color='secondary'
                                        variant='outlined'
                                        label='Password'
                                        name='password'
                                        error={Boolean(touched.password && errors.password)}
                                        helperText={touched.password && errors.password}
                                        type='password'
                                        onChange={handleChange}
                                        value={values.password}/>
                                    </Box>
                                    <Box m={4}  >
                                        <TextField  sx={{ width: '50%' }}
                                        color='secondary'
                                        variant='outlined'
                                        label='Confirm Password'
                                        name='passwordConfirmation'
                                        error={Boolean(touched.passwordConfirmation && errors.passwordConfirmation)}
                                        helperText={touched.passwordConfirmation && errors.passwordConfirmation}
                                        type='password'
                                        onChange={handleChange}
                                        value={values.passwordConfirmation}/>
                                    </Box>
                                    <Box mt={6}>
                                        <Button
                                        variant="outlined"
                                        type='submit'
                                        size='large'
                                        disabled={isSubmitting}
                                        sx={{color: '#ffffff', border: '1px solid #ffffff'}}>
                                            Register
                                        </Button>
                                    </Box>
                                </Box>
                                </Container>
                            </form>
                        )}
                    </Formik>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default SignIn



