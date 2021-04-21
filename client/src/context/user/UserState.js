import React, { useReducer } from 'react'

import UserContext from './UserContext'
import UserReducer from './UserReducer'
import {
  GET_SELECTED_USER,
  CLEAR_SELECTED_USER,
  SEARCH_USER,
  CLEAR_SEARCH,
  SET_LOADING,
} from '../types'

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
    userSearchList: [],
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
    try {
      const response = await axios.post(
        'http://localhost:5000/api/user/profile/update',
        body
      )
      getSelectedUser(response.data.id)
    } catch (err) {
      console.error(err.message)
    }
  }

  // Search users
  const searchUser = async (searchParam) => {
    try {
      if (searchParam === '' || searchParam === ' ') {
        clearSearch()
      } else {
        const response = await axios.get(
          'http://localhost:5000/api/user/search',
          {
            params: {
              searchParam,
            },
          }
        )
        dispatch({
          type: SEARCH_USER,
          payload: response.data,
        })
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  const clearSelectedUser = () => {
    dispatch({ type: CLEAR_SELECTED_USER, payload: initialState.selectedUser })
  }

  // clear search list when no input in search bar
  const clearSearch = async () => {
    dispatch({ type: CLEAR_SEARCH })
  }

  const setLoading = (loading) => {
    dispatch({ type: SET_LOADING, payload: loading })
  }

  return (
    <UserContext.Provider
      value={{
        selectedUser: state.selectedUser,
        userSearchList: state.userSearchList,
        isLoading: state.isLoading,
        getSelectedUser,
        updateProfile,
        searchUser,
        clearSearch,
        setLoading,
        clearSelectedUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState
