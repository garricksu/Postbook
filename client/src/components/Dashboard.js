import React, { Fragment, useState, useEffect, useContext } from 'react'
import UserContext from '../context/user/UserContext'

const Dashboard = () => {
  const userContext = useContext(UserContext)
  const { getUser, clearUser, user: {firstName, lastName, id} } = userContext

  useEffect(() => {
    getUser()
  }, [])

  const logout = (e) => {
    e.preventDefault()
    clearUser()
  }

  return (
    <Fragment>
      <h1>Dashboard</h1>
      <h2>{firstName} {lastName}</h2>
      <button className='btn btn-primary' onClick={(e) => logout(e)}>
        Logout
      </button>
    </Fragment>
  )
}

export default Dashboard
