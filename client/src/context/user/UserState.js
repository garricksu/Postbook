import React, { useReducer } from 'react'
import UserContext from './UserContext'
import UserReducer from './UserReducer'
import { GET_USER, CLEAR_USER, LOGIN_USER, REGISTER_USER, AUTH_FAILED } from '../types'

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
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (response.status === 401) {
      const error = 'email'
      setError(error)
    } else {
      const parseRes = await response.json()

      const { token } = parseRes

      dispatch({
        type: REGISTER_USER,
        payload: token,
      })

      getUser(token)
    }
  }
  try {
  } catch (err) {
    console.error(err.message)
  }

  // Login User
  const loginUser = async (body) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (response.status === 401) {
        setError('credentials')
        // displayInputError()
      } else {
        const parseRes = await response.json()

        const { token } = parseRes

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

  // Get user

  // Clear user

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
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState
