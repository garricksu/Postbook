import React, { useEffect, useContext, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import UserContext from '../context/user/UserContext'

import Navbar from '../components/layout/Navbar'
import Alerts from '../utils/Alerts'
import Dashboard from '../components/Dashboard'
import Login from '../components/Login'
import Register from '../components/Register'
import PrivateRoute from '../routing/PrivateRoute'


const AuthCheck = () => {
  const userContext = useContext(UserContext)
  const { getUser} = userContext

  useEffect(() => {
    getUser()
  }, [])

  return (
    <Fragment>
    <Navbar />
    <div className='container'>
      <Router>
        <Alerts />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
      </Router>
    </div>
    </Fragment>
    
  )
}

export default AuthCheck
