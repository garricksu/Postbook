import React, { Fragment, useState, useEffect, useContext } from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import Dashboard from '../components/Dashboard'
import Login from '../components/Login'
import Register from '../components/Register'
import PrivateRoute from '../routing/PrivateRoute'
import UserContext from '../context/user/UserContext'

const AuthCheck = () => {
  const userContext = useContext(UserContext)
  const { getUser } = userContext

 useEffect(() => {
    getUser()
  },[])

  return (
    <div className='container'>
      <Router>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
      </Router>
    </div>
  )
}

export default AuthCheck
