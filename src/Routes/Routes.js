import React from 'react'
import { Route , Redirect} from 'react-router-dom';


import Login from '../Screens/Login';
import SignIn from '../Screens/SignIn';
import MainPage from '../Screens/MainPage';




function Routes() {
    return (
        <React.Fragment>
                <Route path='/' exact>
                    {!localStorage.getItem('isLoggedIn') ? <Redirect to='/login'/> : <Redirect to='/main'/>}
                </Route>
                <Route path='/login' exact>
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