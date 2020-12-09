import React, { Fragment, useState, useEffect } from 'react'

const Dashboard = () => {
  const [name, setName] = useState('')

  // const getName = async () => {
  //   try {
  //     const response = await fetch('https://localhost:5000/dashboard', {
  //       method: 'GET',
  //       headers: { token: localStorage.token },
  //     })

  //     console.log(response)
  //   } catch (err) {
  //     console.error(err.message)
  //   }
  // }

  // useEffect(() => {
  //   getName()
  // })
  return (
    <Fragment>
      <h1>Dashboard</h1>
    </Fragment>
  )
}

export default Dashboard
