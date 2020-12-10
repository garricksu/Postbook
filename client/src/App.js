import React, { Fragment, useState, useEffect } from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const setAuth = (authStatus) => {
    setIsAuthenticated(authStatus)
  }

  const validAuth = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/auth/verify_session',
        {
          mehthod: 'GET',
          headers: { token: localStorage.token },
        }
      )

      const parseRes = await response.json()

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false)
    } catch (err) {
      console.error(err.message)
    }
  }

  // Check if user is alreaady logged in, even if page is refreshed. (temp until context implementation )
  useEffect(() => {
    validAuth()
  })

  return (
    <Fragment>
      <Router>
        <div className='container'>
          <Route
            exact
            path='/login'
            render={(props) =>
              !isAuthenticated ? (
                <Login {...props} setAuth={setAuth} />
              ) : (
                <Redirect to='/dashboard' />
              )
            }
          />
          <Route
            exact
            path='/register'
            render={(props) =>
              !isAuthenticated ? (
                <Register {...props} setAuth={setAuth} />
              ) : (
                <Redirect to='/dashboard' />
              )
            }
          />
          <Route
            exact
            path='/dashboard'
            render={(props) =>
              isAuthenticated ? (
                <Dashboard {...props} setAuth={setAuth} />
              ) : (
                <Redirect to='/login' />
              )
            }
          />
        </div>
      </Router>
    </Fragment>
  )
}

export default App
