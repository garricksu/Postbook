import React, { useEffect, useContext} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import AuthContext from '../context/auth/AuthContext'

import Navbar from '../components/layout/Navbar'
import Alerts from '../utils/Alerts'
import Dashboard from '../components/Dashboard'
import Login from '../components/Login'
import Register from '../components/Register'
import PrivateRoute from '../routing/PrivateRoute'

const AuthCheck = () => {
  const authContext = useContext(AuthContext)
  const { getUser, isAuthenticated } = authContext

  useEffect(() => {
    getUser()
  }, [])

  return (
    <Router>
      <Navbar />
      <Alerts />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <PrivateRoute exact path='/' component={Dashboard} />
    </Router>
  )
}

export default AuthCheck
