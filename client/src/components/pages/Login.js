import React, { Fragment, useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import AuthContext from '../../context/auth/AuthContext'
import NavContext from '../../context/nav/NavContext'

const Login = (props) => {
  const authContext = useContext(AuthContext)
  const { isAuthenticated, loginUser, error, clearError } = authContext

  const navContext = useContext(NavContext)
  const { setActiveLink } = navContext

  const [input, setInput] = useState({
    email: '',
    password: '',
  })
  const { email, password } = input

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/')
    } else {
      setActiveLink(1)
    }
  }, [isAuthenticated, props.history])

  const updateInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const onSubmitForm = async (e) => {
    e.preventDefault()
    const body = {
      email,
      password,
    }
    loginUser(body)
  }

  return (
    <Fragment>
      {!error ? <div className="my-5 alert-size"></div> : null}
      <form
        onSubmit={onSubmitForm}
        className='mx-3 my-3 mx-auto auth-form'
        id='login-form'
      >
        <h2 className='text-center mb-3'>Login</h2>
        <div className='form-group row'>
          <div className='col'>
            <input
              onChange={(e) => updateInput(e)}
              type='email'
              name='email'
              id='email'
              placeholder='Email'
              className='form-control'
              required
            />
          </div>
        </div>
        <div className='form-group row'>
          <div className='col'>
            <input
              onChange={(e) => updateInput(e)}
              type='password'
              name='password'
              id='password'
              placeholder='Password'
              className='form-control'
              required
            />
          </div>
        </div>
        <button className='btn btn-primary btn-block' id='submit'>
          Submit
        </button>
        <Link to='/register' onClick={clearError}>
          Register
        </Link>
      </form>
    </Fragment>
  )
}

export default Login
