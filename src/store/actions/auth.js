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
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
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
        let url = isSignUp ? signUpURL : signInURL + apiKey
        axios.post(url, authData)
            .then(response => {
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
