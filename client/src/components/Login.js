import React, { Fragment, useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import UserContext from '../context/user/UserContext'

const Login = (props) => {
  const userContext = useContext(UserContext)
  const { isAuthenticated, loginUser, clearError } = userContext

  const [input, setInput] = useState({
    email: '',
    password: '',
  })
  const { email, password } = input

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/dashboard')
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
