import React, { useReducer } from 'react'
import UserContext from './UserContext'
import UserReducer from './UserReducer'
import { GET_SELECTED_USER } from '../types'

import axios from 'axios'

const UserState = (props) => {
  const initialState = {
    selectedUser: {
      id: '',
      firstName: '',
      lastName: '',
      birthday: '',
      bio: '',
      occupation: ''
    },
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
      console.error(err.message)
    }
  }

  return (
    <UserContext.Provider
      value={{
        selectedUser: state.selectedUser,
        getSelectedUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState
