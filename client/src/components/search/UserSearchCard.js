import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import UserContext from '../../context/user/UserContext'

import profilePictureSrc from '../../assets/images/profile-picture.png'

const SearchCard = ({ userId, firstName, lastName, clearSearch }) => {
  return (
    <li className='user-search-card list-group-item p-0'>
      <Link
        to={`/user/${userId}`}
        onClick={clearSearch}
        className=' text-dark text-decoration-none'
      >
        <div className='user-search-card-link d-flex align-items-center m-0 p-3 '>
          <img
            src={profilePictureSrc}
            alt='profile'
            className='post-profile-picture'
          />
          <p className='mb-0 ml-3 font-weight-bold'>
            {firstName} {lastName}
          </p>
        </div>
      </Link>
    </li>
  )
}

export default SearchCard
