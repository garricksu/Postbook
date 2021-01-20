import React, { useReducer } from 'react'

import UserContext from './UserContext'
import UserReducer from './UserReducer'
import { GET_SELECTED_USER, CLEAR_SELECTED_USER, SET_LOADING } from '../types'

import axios from 'axios'

const UserState = (props) => {
  const initialState = {
    selectedUser: {
      id: '',
      firstName: '',
      lastName: '',
      birthday: { month: '', day: '', year: '' },
      age: '',
      bio: '',
      occupation: '',
    },
    isLoading: true,
  }

  const [state, dispatch] = useReducer(UserReducer, initialState)

  // Get Selected user
  const getSelectedUser = async (selectedUserId) => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/user/profile',
        {
          params: {
            selectedUserId,
          },
        }
      )
      dispatch({
        type: GET_SELECTED_USER,
        payload: response.data,
      })
    } catch (err) {
      console.log(err)
      setLoading(false)
      clearSelectedUser()
    }
  }

  // Update user profile
  const updateProfile = async (body) => {
    const config = { headers: { 'Content-Type': 'application/json' } }
    try {
      const response = await axios.post(
        'http://localhost:5000/api/user/profile/update',
        body,
        config
      )
      getSelectedUser(response.data.id)
    } catch (err) {
      console.error(err.message)
    }
  }

  const clearSelectedUser = () => {
    dispatch({ type: CLEAR_SELECTED_USER, payload: initialState.selectedUser })
  }

  const setLoading = (loading) => {
    dispatch({ type: SET_LOADING, payload: loading })
  }

  return (
    <UserContext.Provider
      value={{
        selectedUser: state.selectedUser,
        isLoading: state.isLoading,
        getSelectedUser,
        updateProfile,
        setLoading,
        clearSelectedUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState
