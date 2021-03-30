import React, { useContext, useState } from 'react'

import PostContext from '../../context/post/PostContext'

import menuIconSrc from '../../assets/images/menu_icon.png'

const ContentOptions = (props) => {
  const postContext = useContext(PostContext)
  const { setDeleteModal } = postContext

  const { id, contentType } = props

  const toggleModal = (e) => {
    e.preventDefault()
    setDeleteModal(id, contentType)
  }

  return (
    <div className='align-self-end d-flex align-items-center'>
      <button
        className='btn content-menu-button'
        onClick={toggleModal}
        id='content-menu-icon'
      >
        <p className='small-font font-weight-bold'>Delete</p>
      </button>
    </div>
  )
}

export default ContentOptions
