import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import AuthContext from '../context/auth/AuthContext'

import * as Constants from '../utils/constants'

const Alerts = () => {
  const authContext = useContext(AuthContext)
  const { error } = authContext
  const { credentials, date, email } = Constants

  switch (error) {
    case credentials:
      return (
        <div
          className='alert alert-danger alert-size my-5 mx-auto'
          role='alert'
        >
          Incorrect email or password. Please try again
        </div>
      )
    case date:
      return (
        <div
          className='alert alert-danger alert-size my-5 mx-auto'
          role='alert'
        >
          Please enter valid birthday
        </div>
      )
    case email:
      return (
        <div
          className='alert alert-danger alert-size my-5 mx-auto'
          role='alert'
        >
          Email already exists. Please try again or{' '}
          <Link to='/login'>login</Link>
        </div>
      )
    default:
      return null
  }
}

export default Alerts
