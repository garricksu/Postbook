import React, { useContext, useState, useEffect } from 'react'

import UserContext from '../../context/user/UserContext'
import AuthContext from '../../context/auth/AuthContext'
import PostContext from '../../context/post/PostContext'

const CreatePost = () => {
  const authContext = useContext(AuthContext)
  const {
    loggedInUser: { id, firstName},
  } = authContext

  const postContext = useContext(PostContext)
  const { submitPost } = postContext

  const [newPost, setNewPost] = useState('')

  const updateNewPost = (e) => {
    setNewPost(e.target.value)
  }

  const createNewPost = (e) => {
    e.preventDefault()
    const body = {
      id,
      post_body: newPost,
    }
    submitPost(body)
  }

  const postPrompt = `What's new with you, ${firstName}`
  return (
    <div id='create-post'>
      <form
        action=''
        id='create-post-form'
        class='form-group'
        onSubmit={createNewPost}
      >
        <input
          onChange={(e) => updateNewPost(e)}
          type='text'
          name='occupation'
          id='create-post-field'
          className='form-control'
          placeholder={postPrompt}
          value={newPost}
          maxLength='2000'
        />
        <button
          className='btn btn-primary btn-block'
          id='submit-post-button submit'
        >
          Post
        </button>
      </form>
    </div>
  )
}

export default CreatePost
