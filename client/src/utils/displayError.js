import React from 'react'

const displayError = () => {
  const displayInputError = () => {
    if (error === 'credentials') {
      return (
        <div className='alert alert-danger' role='alert'>
          Incorrect email or password. Please try again
        </div>
      )
    }
  }

}

export default displayError
