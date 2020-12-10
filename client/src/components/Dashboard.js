import React, { Fragment, useState, useEffect } from 'react'

const Dashboard = ({ setAuth }) => {
  const [user, setUser] = useState({ first_name: '', last_name: '' })
  const { firstName, lastName } = user

  const getUser = async () => {
    //Retrieve user with token
    try {
      const response = await fetch('http://localhost:5000/dashboard', {
        method: 'GET',
        headers: { token: localStorage.token },
      })

      const parseRes = await response.json()
      const { first_name, last_name } = parseRes
      setUser({ firstName: first_name, lastName: last_name })
    } catch (err) {
      console.error(err.message)
    }
  }

  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    setAuth(false)
  }

  useEffect(() => {
    getUser()
  }, [])
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
