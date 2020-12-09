import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

const Login = ({ setAuth }) => {
  const [input, setInput] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const { email, password } = input

  const updateInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const onSubmitForm = async (e) => {
    e.preventDefault()

    const body = {
      email,
      password,
    }
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    console.log(response.status)
    if (response.status === 401) {
      setError('credentials')
      displayInputError()
    } else {
      const parseRes = await response.json()

      localStorage.setItem('token', parseRes.token)
      setAuth(true)
    }

    try {
    } catch (err) {
      console.error(err.message)
    }
  }

  const displayInputError = () => {
    if (error === 'dateError') {
      return (
        <div className='alert alert-danger' role='alert'>
          Please enter valid birthday
        </div>
      )
    } else if (error === 'credentials') {
      return (
        <div className='alert alert-danger' role='alert'>
          Incorrect email or password
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
