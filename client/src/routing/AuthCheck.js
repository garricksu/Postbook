import React, { useEffect, useContext } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import AuthContext from '../context/auth/AuthContext'

import Navbar from '../components/layout/Navbar'
import Alerts from '../utils/Alerts'
import DeleteModal from '../utils/DeleteModal'
import PrivateRoute from '../routing/PrivateRoute'
import Login from '../components/pages/Login'
import Register from '../components/pages/Register'
import Dashboard from '../components/pages/Dashboard'
import Profile from '../components/pages/Profile'

const AuthCheck = () => {
  const authContext = useContext(AuthContext)
  const { getLoggedInUser, setLoading } = authContext


  useEffect(() => {
    setLoading(true)
    getLoggedInUser()
  }, [])

  return (
    <Router>
      <Navbar />
      <div className='navbar-offset'>
      <Alerts />
      <DeleteModal />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <PrivateRoute exact path='/' component={Dashboard} />
      <PrivateRoute exact path='/user/:id' component={Profile} />
      </div>
    </Router>
  )
}

export default AuthCheck
