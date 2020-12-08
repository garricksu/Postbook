import React, { Fragment, useState } from 'react'

const Login = () => {
  return (
    <Fragment>
      <h1>Login</h1>
      <form>
        <input type='text' />
        <input type='email' name='email' placeholder='email' />
        <input type='password' name='password' placeholder='password' />
      </form>
    </Fragment>
  )
}

export default Login
