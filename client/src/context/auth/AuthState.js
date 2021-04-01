import React, { useReducer } from 'react'
import AuthContext from './AuthContext'
import AuthReducer from './AuthReducer'
import {
  GET_LOGGED_IN_USER,
  CLEAR_LOGGED_IN_USER,
  LOGIN_USER,
  REGISTER_USER,
  AUTH_FAILED,
  SET_ERROR,
  CLEAR_ERROR,
  SET_LOADING
} from '../types'

import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'
import * as Constants from '../../utils/constants'

const AuthState = (props) => {
  const initialState = {
    loggedInUser: {},
    token: null,
    error: null,
    isAuthenticated: false,
    isLoading: true
  }

  const [state, dispatch] = useReducer(AuthReducer, initialState)

  const { credentials, email } = Constants

  // Register User
  const registerUser = async (body) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        body
      )
      const { token } = response.data

      dispatch({
        type: REGISTER_USER,
        payload: token,
      })

      getLoggedInUser(token)
      clearError()
    } catch (err) {
      setError(email)
      console.error(err.message)
    }
  }

  // Login User
  const loginUser = async (body) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        body
      )
      const { token } = response.data

      dispatch({
        type: LOGIN_USER,
        payload: token,
      })

      getLoggedInUser(token)
      clearError()
    } catch (err) {
      setError(credentials)
      console.error(err.message)
    }
  }

  // Get Logged In User
  const getLoggedInUser = async () => {
    console.log(axios.defaults.headers)
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }
    try {
      const response = await axios.get('http://localhost:5000/api/user/loggedInUser')
      dispatch({
        type: GET_LOGGED_IN_USER,
        payload: response.data,
      })
    } catch (err) {
      dispatch({
        type: AUTH_FAILED,
      })
    }
  }

  // Clear user
  const clearLoggedInUser = () => {
    dispatch({ type: CLEAR_LOGGED_IN_USER })
  }

  // Set Error
  const setError = (error) => {
    dispatch({ type: SET_ERROR, payload: error })

    setTimeout(() => dispatch({ type: CLEAR_ERROR }), 5000)
  }

  // Clear Error
  const clearError = () => {
    dispatch({ type: CLEAR_ERROR })
  }

  const setLoading = (loading) => {
    dispatch({type: SET_LOADING, payload: loading})
  }

  return (
    <AuthContext.Provider
      value={{
        loggedInUser: state.loggedInUser,
        token: state.token,
        error: state.error,
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        loginUser,
        registerUser,
        getLoggedInUser,
        clearLoggedInUser,
        setError,
        clearError,
        setLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState
