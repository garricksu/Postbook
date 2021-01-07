import React, { useContext, useEffect, useState } from 'react'
import {withRouter} from 'react-router-dom'

import UserContext from '../../context/user/UserContext'

import profilePicture from '../../assets/images/profile-picture.png'

const Profile = (props) => {
  const userContext = useContext(UserContext)
  const { getSelectedUser, selectedUser: {firstName, lastName, birthday, bio, occupation} } = userContext

  useEffect(() => {
    getSelectedUser(props.match.params.id)
  },[])





  return (
    <div>
      <img
        src={profilePicture}
        alt='profile picture'
        className=''
        id='profile-picture'
      />
      <h1>
        {firstName}
      </h1>
    </div>
  )
}

export default withRouter(Profile)
