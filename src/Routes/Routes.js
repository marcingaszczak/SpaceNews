import React from 'react'
import { Route } from 'react-router-dom';


import Login from '../Screens/Login';
import SignIn from '../Screens/SignIn';
import MainPage from '../Screens/MainPage';




function Routes() {
    return (
        <React.Fragment>

                <Route path='/' exact>
                    <Login />
                </Route>
                <Route path='/signIn'>
                    <SignIn />
                </Route>
                <Route path='/main' >
                    <MainPage />
                </Route>
        </React.Fragment>

    )
}

export default Routes