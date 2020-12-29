import React, { useReducer } from 'react'
import UserContext from './UserContext'
import UserReducer from './UserReducer'
import {
  GET_USER,
  CLEAR_USER,
  LOGIN_USER,
  REGISTER_USER,
  AUTH_FAILED,
} from '../types'

import setAuthToken from '../../utils/setAuthToken'
import axios from 'axios'

const UserState = (props) => {
  const initialState = {
    user: {},
    token: '',
    error: '',
    isAuthenticated: false,
  }

  const [state, dispatch] = useReducer(UserReducer, initialState)

  // Register User
  const registerUser = async (body) => {
    const config = { headers: { 'Content-Type': 'application/json' } }
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        JSON.stringify(body),
        config
      )
      if (response.status === 401) {
        const error = 'email'
        setError(error)
      } else {
        const { token } = response.data

        dispatch({
          type: REGISTER_USER,
          payload: token,
        })

        getUser(token)
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  // Login User
  const loginUser = async (body) => {
    const config = { headers: { 'Content-Type': 'application/json' } }
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        JSON.stringify(body),
        config
      )
      if (response.status === 401) {
        setError('credentials')
        // displayInputError()
      } else {
        const { token } = response.data
        dispatch({
          type: LOGIN_USER,
          payload: token,
        })
        getUser(token)
      }
    } catch (err) {
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
  const setError = (error) => {}

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
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState
