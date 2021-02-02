import React, { useContext, useState } from 'react'

import AuthContext from '../../context/auth/AuthContext'
import PostContext from '../../context/post/PostContext'

import send_button from '../../assets/images/send_button.png'

const CreateComment = (props) => {
  const { post_id } = props

  const authContext = useContext(AuthContext)
  const {
    loggedInUser: { id },
  } = authContext

  const postContext = useContext(PostContext)
  const { submitComment } = postContext

  const [newComment, setNewComment] = useState('')

  const updateNewComment = (e) => {
    setNewComment(e.target.value)
  }

  const createNewComment = (e) => {
    e.preventDefault()
    if (newComment !== '') {
      const body = {
        user_id: id,
        post_id,
        comment_body: newComment,
      }
      submitComment(body)
      setNewComment('')
    }
  }

  return (
    <form
      className='form-group mt-3 border rounded py-1 px-2 d-flex'
      id='create-comment-form'
      onSubmit={createNewComment}
    >
      <input
        onChange={updateNewComment}
        className='w-100 py-1 px-2'
        type='text'
        placeholder='Comment...'
        value={newComment}
        id='create-comment-input'
        maxLength='2000'
      />
      <button className='btn' id='submit'>
        <img src={send_button} alt='send' className='send-button' />
      </button>
    </form>
  )
}

export default CreateComment
