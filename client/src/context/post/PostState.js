import React, { useReducer } from 'react'

import PostContext from './PostContext'
import PostReducer from './PostReducer'
import {
  GET_USER_POSTS,
  CREATE_POST,
  DELETE_POST,
  GET_DASHBOARD_POSTS,
  SET_LOADING,
} from '../types'

import axios from 'axios'

const PostState = (props) => {
  const initialState = {
    posts: [],
    isLoading: true,
  }

  const [state, dispatch] = useReducer(PostReducer, initialState)

  // Creat new post
  const submitPost = async (body) => {
    const config = { headers: { 'Content-Type': 'application/json' } }
    try {
      const response = await axios.post(
        `http://localhost:5000/api/posts/new/${body.id}`,
        body,
        config
      )
      dispatch({
        type: CREATE_POST,
        payload: response.data.post,
      })
    } catch (err) {
      console.log(err)
    }
  }

  const getUserPosts = (selectedUserId) => {}

  const setLoading = (loading) => {
    dispatch({ type: SET_LOADING, payload: loading })
  }

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        isLoading: state.isLoading,
        getUserPosts,
        submitPost,
      }}
    >
      {props.children}
    </PostContext.Provider>
  )
}

export default PostState
