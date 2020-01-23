import * as actionTypes from './actionTypes'
import axios from 'axios'
import { signInURL, signUpURL, apiKey } from '../../config'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        IdToken: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_INIT_LOGOUT
    }
}

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = expirationTime => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = (isSignUp ? signUpURL : signInURL) + apiKey
        axios.post(url, authData)
            .then(response => {

                const expirationDate =
                    new Date(
                    new Date().getTime() + response.data.expiresIn * 1000
                )

                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userId', response.data.localId)

                dispatch(
                    authSuccess(
                        response.data.idToken,
                        response.data.localId
                    )
                )
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(error => {
                //todo: add a mapping for Firebase to APP error mapping
                // probably using the .code or .status field not the .error
                dispatch(authFail(error.response.data.error))
            })
    }
}

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate > new Date()) {
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId))
                dispatch(
                    checkAuthTimeout(
                        (expirationDate.getTime() - new Date().getTime()) / 1000
                    )
                )
            } else {
                dispatch(logout())
            }
        }
    }
}