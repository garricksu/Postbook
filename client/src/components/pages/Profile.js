import React, { useContext, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'

import AuthContext from '../../context/auth/AuthContext'
import UserContext from '../../context/user/UserContext'
import NavContext from '../../context/nav/NavContext'

import profilePicture from '../../assets/images/profile-picture.png'

const Profile = (props) => {
  const authContext = useContext(AuthContext)
  const { loggedInUser } = authContext

  const userContext = useContext(UserContext)
  const {
    getSelectedUser,
    selectedUser: {
      id,
      firstName,
      lastName,
      birthday: { month, day, year },
      age,
      bio,
      occupation,
    },
    updateProfile,
  } = userContext

  const navContext = useContext(NavContext)
  const { setActiveLink } = navContext

  const [updatedDetails, setUpdatedDetails] = useState({
    updatedBio: '',
    updatedOccupation: '',
  })
  const { updatedBio, updatedOccupation } = updatedDetails

  const [editing, setEditing] = useState(false)

  useEffect(() => {
    getSelectedUser(props.match.params.id)
    if (props.match.params.id === loggedInUser.id) {
      setActiveLink(1)
    } else {
      setActiveLink(-1)
    }
  }, [props.match.params.id])

  const toggleEditing = (e, bool) => {
    e.preventDefault()
    setUpdatedDetails({ updatedBio: bio, updatedOccupation: occupation })
    setEditing(bool)
  }

  const updateInput = (e, field) => {
    setUpdatedDetails({ ...updatedDetails, [field]: e.target.value })
  }

  const updateUserProfile = (e) => {
    e.preventDefault()
    const body = {
      id: loggedInUser.id,
      bio: updatedBio,
      occupation: updatedOccupation,
    }
    updateProfile(body)
    toggleEditing(e, false)
  }

  const returnDetails = () => {
    return editing ? (
      <div
        className='user-details border border-light rounded bg-light py-4 px-3 edit-container'
        id='user-details'
      >
        <h6>Age</h6>
        <p className='ml-2'>{age}</p>
        <h6>Birthday</h6>
        <p className='ml-2'>
          {month} {day}, {year}
        </p>
        <form onSubmit={updateUserProfile} id='update-profile-form form-group'>
        <div className='d-flex justify-content-between'>
            <h6>Occupation</h6>
            <h6 className='text-muted'>{updatedOccupation.length}/100</h6>
          </div>
          <input
            onChange={(e) => updateInput(e, 'updatedOccupation')}
            type='text'
            name='occupation'
            id='occupation-edit-field'
            className='form-control mb-3'
            placeholder='occupation'
            value={updatedOccupation ? updatedOccupation : ''}
            maxLength='150'
          />
          <div className='d-flex justify-content-between'>
            <h6>Bio</h6>
            <h6 className='text-muted'>{updatedBio.length}/500</h6>
          </div>
          <textarea
            onChange={(e) => updateInput(e, 'updatedBio')}
            type='text'
            name='bio'
            id='bio-edit-field'
            className='bio-text mb-3'
            placeholder='bio'
            value={updatedBio ? updatedBio : ''}
            maxLength='500'
          />
          <div
            className='form-group row my-3'
          >
            <div className='col'>
              <button
                className='btn btn-primary btn-block'
                onClick={(e) => toggleEditing(e, false)}
              >
                Cancel
              </button>
            </div>
            <div className='col'>
              <button className='btn btn-primary btn-block' id='submit'>
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    ) : (
      <div>
        <div
          className='user-details border border-light rounded bg-light py-4 px-3'
          id='user-details'
        >
          <h6>Age</h6>
          <p className='ml-2'>{age}</p>
          <h6>Birthday</h6>
          <p className='ml-2'>
            {month} {day}, {year}
          </p>
          <h6>Occupation</h6>
          {occupation ? <p className='ml-2'>{occupation}</p> : <br></br>}
          <h6>Bio</h6>
          {bio ? <p className='ml-2'>{bio}</p> : <br></br>}
          {loggedInUser.id === id ? (
            <button
              className='btn btn-primary btn-block'
              onClick={(e) => toggleEditing(e, true)}
            >
              Edit
            </button>
          ) : null}
        </div>
      </div>
    )
  }

  const isValidUser = () => {
    return id === '' ? (
      <h1 className='text-center'>
        Error 404<br></br>USER NOT FOUND
      </h1>
    ) : (
      <div className='user-container' id='user-container'>
        <div className='profile-details text-center mb-4' id='profile-details'>
          <img
            src={profilePicture}
            alt='profile'
            className='profile-picture border border-secondary rounded'
            id='profile-picture'
          />
          <h4 className='font-weight-bold my-2' id='user-name'>
            {firstName} {lastName}
          </h4>
        </div>
        {returnDetails()}
      </div>
    )
  }

  return <div className='container my-5'>{isValidUser()}</div>
}

export default withRouter(Profile)
