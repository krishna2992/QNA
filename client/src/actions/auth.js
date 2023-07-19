import {setCurrentUser} from '../actions/currentUser'
import * as api from '../api'

export const signUp = (authData, navigate) => async (dispatch) =>{
    try {
        const {data} = await api.signUp(authData)
        dispatch({type: 'AUTH', data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}

export const logIn = (authData, navigate) => async (dispatch) =>{
    try {
        const {data} = await api.logIn(authData)
        dispatch({type: 'AUTH', data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}

