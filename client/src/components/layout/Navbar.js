import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import AuthContext from '../../context/auth/AuthContext'
import NavContext from '../../context/nav/NavContext'

const Navbar = () => {
  const authContext = useContext(AuthContext)
  const {
    isAuthenticated,
    clearError,
    loggedInUser: { id },
    getLoggedInUser,
    isLoading,
  } = authContext

  const navContext = useContext(NavContext)
  const { active, setActiveLink } = navContext

  useEffect(() => {
    if (isAuthenticated) {
      getLoggedInUser()
    }
  }, [isAuthenticated])

  const generalLinks = [
    { name: 'Home', route: '/', id: 'home-link' },
    { name: 'Login', route: '/login', id: 'login-link' },
    { name: 'Register', route: '/register', id: 'register-link' },
  ]
  const userLinks = [
    { name: 'Home', route: '/', id: 'home-link' },
    { name: 'Profile', route: `/user/${id}`, id: 'profile-link' },
    { name: 'Settings', route: '/', id: 'settings-link' },
  ]

  const changeActiveLink = (index) => {
    setActiveLink(index)
    clearError()
  }

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <Link
        className='navbar-brand'
        id='brand-link'
        to='/'
        onClick={clearError}
      >
        Postbook
      </Link>
      {!isAuthenticated && !isLoading ? (
        <ul className='navbar-nav ml-auto' id='nav-list'>
          {generalLinks.map((link, index) => (
            <li className='nav-item' key={index}>
              <Link
                className={
                  index === active
                    ? 'active active-underline nav-link'
                    : 'nav-link'
                }
                id={link.id}
                to={link.route}
                onClick={() => changeActiveLink(index)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <ul className='navbar-nav ml-auto' id='nav-list'>
          {userLinks.map((link, index) => (
            <li className='nav-item' key={index}>
              <Link
                className={
                  index === active
                    ? 'active active-underline nav-link'
                    : 'nav-link'
                }
                id={link.id}
                to={link.route}
                onClick={() => changeActiveLink(index)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}

export default Navbar
