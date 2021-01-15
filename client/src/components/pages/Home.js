import React, { useContext, useEffect } from 'react'
import NavContext from '../../context/nav/NavContext'

const Home = () => {
  const navContext = useContext(NavContext)
  const { setActiveLink } = navContext

  useEffect(() => {
    setActiveLink(0)
  }, [])

  return (
    <div>
      <h1 className='text-center'>Welcome To Postbook</h1>
    </div>
  )
}

export default Home
