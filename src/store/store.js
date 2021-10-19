import { createStore } from "redux";

const initialState = {
    token: localStorage.getItem('token'),
    email: localStorage.getItem('email'),
    username: localStorage.getItem('username'),
    isLoggedIn: (localStorage.getItem('isLoggedIn') === 'true')
}

const loginReducer = (state = initialState, action) => {
    if(action.type === 'signIn'){

        return {
            token: action.userInfo.idToken,
            email: action.userInfo.email,
            username: action.userInfo.username,
            isLoggedIn: true
        }
    } else if(action.type === 'logout'){
        return{
                token: '',
                email: '',
                username: '',
                isLoggedIn: false
        }
    }
    else {
        return {
            token: state.token,
            email: state.email,
            username: state.username,
            isLoggedIn: state.isLoggedIn
        }
    }
}

const store = createStore(loginReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;