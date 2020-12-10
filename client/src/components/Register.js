import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

const Register = ({ setAuth }) => {
  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    month: '',
    day: '',
    year: '',
  })
  const [error, setError] = useState('')

  const { firstName, lastName, email, password, month, day, year } = input

  // List of dates for select menu
  const getDays = () => {
    let days = [
      <option disabled selected value=''>
        Day
      </option>,
    ]
    for (let i = 1; i <= 31; i++) {
      days.push(<option value={i}>{i}</option>)
    }
    return days
  }

  //  List of years for select menu
  const getYears = () => {
    let years = [
      <option disabled selected value=''>
        Year
      </option>,
    ]
    const currentYear = new Date().getFullYear()
    for (let i = currentYear; i >= currentYear - 117; i--) {
      let dayValue = 0
      if (i < 10) {
        dayValue = `0${i}`
      } else {
        dayValue = `${i}`
      }
      years.push(<option value={dayValue}>{i}</option>)
    }
    return years
  }

  const updateInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const onSubmitForm = async (e) => {
    e.preventDefault()
    if (checkInputDate()) {
      const body = {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        birthday: `${year} ${month} ${day}`,
      }
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (response.status === 401) {
        setError('email')
        displayInputError()
      } else {
        const parseRes = await response.json()

        localStorage.setItem('token', parseRes.token)
        setAuth(true)
      }
    }
    try {
    } catch (err) {
      console.error(err.message)
    }
  }

  // Check user birthday is valid date
  const checkInputDate = () => {
    const validDate = new Date(`${day} ${month} ${year}`)
    const inputMonth = new Date(`1 ${month} ${year}`).getMonth()
    if (isNaN(validDate) || inputMonth !== validDate.getMonth()) {
      setError('dateError')
      return false
    } else {
      setError('')
      return true
    }
  }

  // Return alert based on error in input
  const displayInputError = () => {
    if (error === 'dateError') {
      return (
        <div className='alert alert-danger' role='alert'>
          Please enter valid birthday
        </div>
      )
    } else if (error === 'email') {
      return (
        <div className='alert alert-danger' role='alert'>
          Email already exists. Please try again or{' '}
          <Link to='/login'>login</Link>
        </div>
      )
    }
  }

  return (
    <Fragment>
      <h1>Register</h1>
      <form onSubmit={onSubmitForm} className='mx-3'>
        {displayInputError()}
        <div className='form-group row'>
          <div className='col'>
            <input
              onChange={(e) => updateInput(e)}
              type='text'
              name='firstName'
              placeholder='First Name'
              className='form-control my-3'
              required
            />
          </div>
          <div className='col'>
            <input
              onChange={(e) => updateInput(e)}
              type='text'
              name='lastName'
              placeholder='Last Name'
              className='form-control my-3'
              required
            />
          </div>
        </div>
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
        <div className='form-group row'>
          <div className='col'>
            <label htmlFor='Month' className='col-form-label'>
              <select
                onChange={(e) => updateInput(e)}
                name='month'
                id='month'
                className='form-control my-3'
                required
              >
                <option disabled selected value=''>
                  Month
                </option>
                <option value='Jan'>Jan</option>
                <option value='Feb'>Feb</option>
                <option value='Mar'>Mar</option>
                <option value='Apr'>Apr</option>
                <option value='May'>May</option>
                <option value='Jun'>Jun</option>
                <option value='Jul'>Jul</option>
                <option value='Aug'>Aug</option>
                <option value='Sep'>Sep</option>
                <option value='Oct'>Oct</option>
                <option value='Nov'>Nov</option>
                <option value='Dec'>Dec</option>
              </select>
            </label>
          </div>
          <div className='col'>
            <label htmlFor='Month' className='col-form-label'>
              <select
                onChange={(e) => updateInput(e)}
                name='day'
                id='day'
                className='form-control my-3'
                required
              >
                {getDays()}
              </select>
            </label>
          </div>
          <div className='col'>
            <label htmlFor='Month' className='col-form-label'>
              <select
                onChange={(e) => updateInput(e)}
                name='year'
                id='year'
                className='form-control my-3'
                required
              >
                {getYears()}
              </select>
            </label>
          </div>
          <button className='btn btn-primary btn-block'>Submit</button>
        </div>
      </form>
      <Link to='/login'>Login</Link>
    </Fragment>
  )
}

export default Register
