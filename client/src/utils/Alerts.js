import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import UserContext from '../context/user/UserContext'

import * as Constants from '../utils/constants'

const Alerts = () => {
  const userContext = useContext(UserContext)
  const { error } = userContext
  const { credentials, date, email } = Constants
  switch (error) {
    case credentials:
      return (
        <div className='alert alert-danger' role='alert'>
          Incorrect email or password. Please try again
        </div>
      )
    case date:
      return (
        <div className='alert alert-danger' role='alert'>
          Please enter valid birthday
        </div>
      )
    case email:
      return (
        <div className='alert alert-danger' role='alert'>
          Email already exists. Please try again or
          <Link to='/login'>login</Link>
        </div>
      )
    default:
      return null
  }
}

export default Alerts
