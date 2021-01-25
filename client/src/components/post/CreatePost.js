import React, { useContext, useState } from 'react'

import AuthContext from '../../context/auth/AuthContext'
import PostContext from '../../context/post/PostContext'

const CreatePost = () => {
  const authContext = useContext(AuthContext)
  const {
    loggedInUser: { id, firstName },
  } = authContext

  const postContext = useContext(PostContext)
  const { submitPost } = postContext

  const [newPost, setNewPost] = useState('')

  const updateNewPost = (e) => {
    setNewPost(e.target.value)
  }

  const createNewPost = (e) => {
    e.preventDefault()
    if (newPost !== '') {
      const body = {
        id,
        post_body: newPost,
      }
      submitPost(body)
      setNewPost('')
    }
  }

  const postPrompt = `What's new with you, ${firstName}`
  return (
    <div id='create-post'>
      <form
        action=''
        id='create-post-form'
        className='form-group'
        onSubmit={createNewPost}
      >
        <textarea
          onChange={updateNewPost}
          type='text'
          name='occupation'
          id='create-post-field'
          className='create-post-form'
          placeholder={postPrompt}
          value={newPost}
          maxLength='2000'
        />
        <button className='btn btn-primary btn-block my-1' id='submit'>
          Post
        </button>
      </form>
    </div>
  )
}

export default CreatePost
