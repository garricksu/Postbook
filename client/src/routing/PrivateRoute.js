import React, { useContext } from 'react'
import { Route } from 'react-router-dom'

import AuthContext from '../context/auth/AuthContext'
import Home from '../components/pages/Home'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext)
  const { isAuthenticated, isLoading } = authContext

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !isLoading ? <Home /> : <Component {...props} />
      }
    />
  )
}

export default PrivateRoute
