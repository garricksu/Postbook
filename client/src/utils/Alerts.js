import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/user/UserContext'

const Alerts = () => {
  const userContext = useContext(UserContext)
  const { error } = userContext
  switch (error) {
    case 'credentials':
      return (
        <div className='alert alert-danger' role='alert'>
          Incorrect email or password. Please try again
        </div>
      )
    case 'dateError':
      return (
        <div className='alert alert-danger' role='alert'>
          Please enter valid birthday
        </div>
      )
    case 'email':
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
