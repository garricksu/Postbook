import React, { useContext, useEffect } from 'react'

import UserContext from '../../context/user/UserContext'

import profilePicture from '../../assets/images/profile-picture.png'

const Profile = (props) => {
  const userContext = useContext(UserContext)
  const { getSelectedUser, selectedUser } = userContext
  

  useEffect(() => {
    getSelectedUser(props.match.params.id)
  }, [])

  return (
    <div>
      <img
        src={profilePicture}
        alt='profile picture'
        className=''
        id='profile-picture'
      />
      <h1>
        
      </h1>
    </div>
  )
}

export default Profile
