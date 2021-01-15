import React, { useContext } from 'react'
import { Route } from 'react-router-dom'

import AuthContext from '../context/auth/AuthContext'
import Home from '../components/Home'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext)
  const { isAuthenticated } = authContext

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? <Home /> : <Component {...props} />
      }
    />
  )
}

export default PrivateRoute
