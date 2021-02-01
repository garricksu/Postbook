import React, { useContext, useState } from 'react'

import AuthContext from '../../context/auth/AuthContext'
import PostContext from '../../context/post/PostContext'

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
        className='w-100'
        type='text'
        placeholder='Comment...'
        value={newComment}
        id='create-comment-input'
        maxLength='2000'
      />
      <button className='btn btn-primary' id='submit'>
        Comment
      </button>
    </form>
  )
}

export default CreateComment
