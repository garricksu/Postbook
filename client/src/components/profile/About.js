import React, { useContext, useEffect, useState } from 'react'

import AuthContext from '../../context/auth/AuthContext'
import UserContext from '../../context/user/UserContext'
import NavContext from '../../context/nav/NavContext'

import profilePicture from '../../assets/images/profile-picture.png'

export const About = () => {
  const authContext = useContext(AuthContext)
  const { loggedInUser } = authContext

  const userContext = useContext(UserContext)
  const {
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

  const [isEditing, setEditing] = useState(false)

  useEffect(() => {
    id === loggedInUser.id ? setActiveLink(1) : setActiveLink(-1)
  }, [])

  const toggleEditing = (e) => {
    e.preventDefault()
    if (occupation !== null && bio !== null) {
      setUpdatedDetails((updatedDetails) => {
        return {
          ...updatedDetails,
          updatedOccupation: occupation,
          updatedBio: bio,
        }
      })
    } else if (bio !== null) {
      setUpdatedDetails((updatedDetails) => {
        return { ...updatedDetails, updatedBio: bio }
      })
    } else if (occupation !== null) {
      setUpdatedDetails((updatedDetails) => {
        return { ...updatedDetails, updatedOccupation: occupation }
      })
    }
    setEditing(!isEditing)
  }

  const updateOccupation = (e) => {
    setUpdatedDetails((updatedDetails) => {
      return { ...updatedDetails, updatedOccupation: e.target.value }
    })
  }

  const updateBio = (e) => {
    setUpdatedDetails((updatedDetails) => {
      return { ...updatedDetails, updatedBio: e.target.value }
    })
  }

  const updateUserProfile = (e) => {
    e.preventDefault()
    const body = {
      id: loggedInUser.id,
      bio: updatedBio,
      occupation: updatedOccupation,
    }
    updateProfile(body)
    toggleEditing(e)
  }

  const returnDetails = () => {
    if (isEditing) {
      return (
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
          <form
            onSubmit={updateUserProfile}
            id='update-profile-form'
            className='form-group'
          >
            <div className='d-flex justify-content-between'>
              <h6>Occupation</h6>
              <h6 className='text-muted'>{updatedOccupation.length}/100</h6>
            </div>
            <input
              onChange={updateOccupation}
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
              onChange={updateBio}
              type='text'
              name='bio'
              id='bio-edit-field'
              className='bio-edit-form mb-3'
              placeholder='bio'
              value={updatedBio ? updatedBio : ''}
              maxLength='500'
            />
            <div className='form-group row my-3'>
              <div className='col'>
                <button
                  className='btn btn-primary btn-block'
                  onClick={toggleEditing}
                  id='cancel-edit-button'
                >
                  Cancel
                </button>
              </div>
              <div className='col'>
                <button
                  className='btn btn-primary btn-block'
                  id='submit save-user-details-button'
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      )
    } else {
      return (
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
                onClick={toggleEditing}
                id='edit-user-details-button'
              >
                Edit
              </button>
            ) : null}
          </div>
        </div>
      )
    }
  }

  return (
    <div className='user-container col' id='user-container'>
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

export default About
