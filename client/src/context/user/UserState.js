import React, { useReducer } from 'react'
import UserContext from './UserContext'
import UserReducer from './UserReducer'
import {
  GET_USER,
  CLEAR_USER,
  LOGIN_USER,
  REGISTER_USER,
  AUTH_FAILED,
  SET_ERROR,
  CLEAR_ERROR,
} from '../types'

import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'
import * as Constants from '../../utils/constants'

const UserState = (props) => {
  const initialState = {
    user: {},
    token: null,
    error: null,
    isAuthenticated: false,
  }

  const [state, dispatch] = useReducer(UserReducer, initialState)

  const { credentials, email } = Constants

  // Register User
  const registerUser = async (body) => {
    const config = { headers: { 'Content-Type': 'application/json' } }
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        body,
        config
      )
      const { token } = response.data

      dispatch({
        type: REGISTER_USER,
        payload: token,
      })

      getUser(token)
      clearError()
    } catch (err) {
      setError(email)
      console.error(err.message)
    }
  }

  // Login User
  const loginUser = async (body) => {
    const config = { headers: { 'Content-Type': 'application/json' } }
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        body,
        config
      )
      const { token } = response.data

      dispatch({
        type: LOGIN_USER,
        payload: token,
      })

      getUser(token)
      clearError()
    } catch (err) {
      setError(credentials)
      console.error(err.message)
    }
  }

  // Get User
  const getUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }
    try {
      const response = await axios.get('http://localhost:5000/dashboard')
      dispatch({
        type: GET_USER,
        payload: response.data,
      })
    } catch (err) {
      dispatch({
        type: AUTH_FAILED,
      })
    }
  }

  // Clear user
  const clearUser = () => {
    dispatch({ type: CLEAR_USER })
  }

  // Set Error
  const setError = (error) => {
    dispatch({ type: SET_ERROR, payload: error })
  }

  // Clear Error
  const clearError = () => {
    dispatch({ type: CLEAR_ERROR })
  }

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        token: state.token,
        error: state.error,
        isAuthenticated: state.isAuthenticated,
        loginUser,
        registerUser,
        getUser,
        clearUser,
        setError,
        clearError,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState
