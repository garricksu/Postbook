import React, { Fragment, useEffect, useContext } from 'react'

import AuthContext from '../context/auth/AuthContext'
import NavContext from '../context/nav/NavContext'

const Dashboard = () => {
  const authContext = useContext(AuthContext)

  const {
    getUser,
    clearUser,
    user: { firstName, lastName, id },
  } = authContext

  const navContext = useContext(NavContext)
  const { setActiveLink } = navContext

  useEffect(() => {
    getUser()
    setActiveLink(0)
  }, [])

  const logout = (e) => {
    e.preventDefault()
    clearUser()
  }

  return (
    <Fragment>
      <h1>Dashboard</h1>
      <h2>
        {firstName} {lastName}
      </h2>
      <button className='btn btn-primary' onClick={(e) => logout(e)}>
        Logout
      </button>
    </Fragment>
  )
}

export default Dashboard
