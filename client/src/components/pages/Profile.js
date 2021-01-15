import React, { useContext, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'

import UserContext from '../../context/user/UserContext'
import AuthContext from '../../context/auth/AuthContext'


import About from '../profile/About'
import CreatePost from '../post/CreatePost'

const Profile = (props) => {
  const userContext = useContext(UserContext)
  const {
    getSelectedUser,
    selectedUser: { id },
    isLoading,
  } = userContext

  const authContext = useContext(AuthContext)
  const { loggedInUser } = authContext


  useEffect(() => {
    getSelectedUser(props.match.params.id)
  }, [props.match.params.id])

  const isValidUser = () => {
    if (id === '') {
      return (
        <h1 className='text-center'>
          Error 404<br></br>USER NOT FOUND
        </h1>
      )
    } else {
      return (
        <div class='row'>
          <About />
          <div className='profile-feed col-6 mx-auto'>
            {id === loggedInUser.id ? <CreatePost /> : null}
          </div>

          <div className='col'></div>
        </div>
      )
    }
  }

  return !isLoading ? (
    <div className='container my-5'>{isValidUser()}</div>
  ) : null
}

export default withRouter(Profile)
