import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import UserContext from '../context/user/UserContext'
const PrivateRoute = ({ component: Component, ...rest }) => {
  const userContext = useContext(UserContext)

  const { isAuthenticated } = userContext
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? <Redirect to='/login' /> : <Component {...props} />
      }
    />
  )
}

export default PrivateRoute
