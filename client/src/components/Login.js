import React, { Fragment, useState, useContext, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import UserContext from '../context/user/UserContext'

const Login = (props) => {
  const userContext = useContext(UserContext)
  const {isAuthenticated, loginUser} = userContext
  const [input, setInput] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const { email, password } = input

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/dashboard')
    }
  },[isAuthenticated, props.history])

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

  // display credentials error if no matching email/password
  const displayInputError = () => {
    if (error === 'credentials') {
      return (
        <div className='alert alert-danger' role='alert'>
          Incorrect email or password. Please try again
        </div>
      )
    }
  }

  return (
    <Fragment>
      <h1>Login</h1>
      <form onSubmit={onSubmitForm} className='mx-3'>
        {displayInputError()}
        <input
          onChange={(e) => updateInput(e)}
          type='email'
          name='email'
          placeholder='Email'
          className='form-control my-3'
          required
        />
        <input
          onChange={(e) => updateInput(e)}
          type='password'
          name='password'
          placeholder='Password'
          className='form-control my-3'
          required
        />
        <button className='btn btn-primary btn-block'>Submit</button>
      </form>
      <Link to='/register'>Register</Link>
    </Fragment>
  )
}

export default Login
