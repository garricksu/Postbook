import React, { Fragment, useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import AuthContext from '../../context/auth/AuthContext'
import NavContext from '../../context/nav/NavContext'

import * as Constants from '../../utils/constants'

const Register = (props) => {
  const authContext = useContext(AuthContext)
  const { isAuthenticated, registerUser, error, setError, clearError } = authContext

  const navContext = useContext(NavContext)
  const { setActiveLink } = navContext

  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    month: '',
    day: '',
    year: '',
  })

  const { firstName, lastName, email, password, month, day, year } = input

  const { date } = Constants

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/')
      setActiveLink(0)
    } else {
      setActiveLink(2)
    }
  }, [isAuthenticated, props.history])

  // List of dates for select menu
  const getDays = () => {
    let days = []
    for (let i = 1; i <= 31; i++) {
      days.push(i)
    }
    return days.map((day, index) => (
      <option key={index} value={day}>
        {day}
      </option>
    ))
  }

  //  List of years for select menu
  const getYears = () => {
    let years = []
    const currentYear = new Date().getFullYear()
    for (let i = currentYear; i >= 1905; i--) {
      years.push(i)
    }
    return years.map((year, index) => (
      <option key={index} value={year}>
        {year}
      </option>
    ))
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
      registerUser(body)
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
    console.log(input)
    if (isNaN(validDate) || inputMonth !== validDate.getMonth()) {
      setError(date)
      return false
    } else return true
  }

  return (
    <Fragment>
      {!error ? <div className="my-5 alert-size"></div> : null}
      <form
        onSubmit={onSubmitForm}
        className='my-3 mx-auto auth-form'
        id='register-form'
      >
        <h2 className='text-center'>Register</h2>
        <div className='form-group row'>
          <div className='col'>
            <input
              onChange={updateInput}
              type='text'
              name='firstName'
              id='first-name'
              placeholder='First Name'
              className='form-control mt-3'
              required
            />
          </div>
          <div className='col'>
            <input
              onChange={updateInput}
              type='text'
              name='lastName'
              id='last-name'
              placeholder='Last Name'
              className='form-control mt-3'
              required
            />
          </div>
        </div>
        <input
          onChange={updateInput}
          type='email'
          name='email'
          id='email'
          placeholder='Email'
          className='form-control my-3'
          required
        />
        <input
          onChange={updateInput}
          type='password'
          name='password'
          id='password'
          placeholder='Password'
          className='form-control my-3'
          required
        />
        <div className='form-group row'>
          <div className='col'>
            <label htmlFor='Month' className='col-form-label'>
              <select
                onChange={updateInput}
                name='month'
                id='month'
                className='form-control'
                required
              >
                <option disabled default value=''>Month</option>
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
          <div className='col d-flex justify-content-center'>
            <label htmlFor='Month' className='col-form-label'>
              <select
                onChange={updateInput}
                name='day'
                id='day'
                className='form-control'
              >
                <option disabled default value=''>
                  Day
                </option>
                {getDays()}
              </select>
            </label>
          </div>
          <div className='col d-flex justify-content-end'>
            <label htmlFor='Month' className='col-form-label'>
              <select
                onChange={updateInput}
                name='year'
                id='year'
                className='form-control'
                required
              >
                <option disabled default value=''>
                  Year
                </option>
                {getYears()}
              </select>
            </label>
          </div>
        </div>
        <button className='btn btn-primary btn-block'>Submit</button>
        <Link to='/login' onClick={clearError}>
          Login
        </Link>
      </form>
    </Fragment>
  )
}

export default Register
