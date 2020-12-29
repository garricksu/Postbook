import React, { Fragment, useState, useEffect, useContext } from 'react'
import UserContext from '../context/user/UserContext'

const Dashboard = () => {
  const userContext = useContext(UserContext)
  const { getUser, user: {firstName, lastName, id} } = userContext

  // const getUser = async () => {
  //   //Retrieve user with token
  //   try {
  //     const response = await fetch('http://localhost:5000/dashboard', {
  //       method: 'GET',
  //       headers: { token: localStorage.token },
  //     })

  //     const parseRes = await response.json()
  //     const { first_name, last_name } = parseRes
  //     setUser({ firstName: first_name, lastName: last_name })
  //   } catch (err) {
  //     console.error(err.message)
  //   }
  // }

  useEffect(() => {
    getUser()
  }, [])

  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
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
