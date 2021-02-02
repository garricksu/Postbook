import React, { useContext, useState } from 'react'

import PostContext from '../../context/post/PostContext'

import menu_icon from '../../assets/images/menu_icon.png'

const ContentOptions = (props) => {
  const postContext = useContext(PostContext)
  const { setDeleteModal } = postContext

  const { id, contentType } = props

  const toggleModal = (e) => {
    e.preventDefault()
    setDeleteModal(id, contentType)
    setShowMenu(!showMenu)
  }

  const [showMenu, setShowMenu] = useState(false)

  const toggleShowMenu = (e) => {
    e.preventDefault()
    setShowMenu(!showMenu)
  }

  const returnOptions = () => {
    if (showMenu) {
      return (
        <ul className='content-options-list px-0' id='content-options'>
          <li className='bg-white border rounded bg-light text-center'>
            <button
              className='btn font-weight-bold'
              id='delete-button'
              onClick={toggleModal}
            >
              Delete
            </button>
          </li>
        </ul>
      )
    } else {
      return null
    }
  }

  return (
    <div className='align-self-end'>
      <button className='btn' onClick={toggleShowMenu} id='content-menu-icon'>
        <img src={menu_icon} alt='content-menu' className='content-menu-icon' />
      </button>
      {returnOptions()}
    </div>
  )
}

export default ContentOptions
