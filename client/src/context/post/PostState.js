import React, { useReducer } from 'react'

import PostContext from './PostContext'
import PostReducer from './PostReducer'
import {
  GET_USER_POSTS,
  DELETE_POST,
  GET_DASHBOARD_POSTS,
  SUBMIT_POST,
  SUBMIT_COMMENT,
  DELETE_COMMENT,
  SET_DELETE_MODAL,
  CLEAR_DELETE_MODAL,
  SET_LOADING,
} from '../types'

import axios from 'axios'

const PostState = (props) => {
  const initialState = {
    posts: [],
    deleteAction: {
      showModal: false,
      id: '',
      contentType: '',
    },
    isLoading: true,
  }

  const [state, dispatch] = useReducer(PostReducer, initialState)

  // Creat new post
  const submitPost = async (body) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/posts/new/${body.id}`,
        body
      )
      dispatch({
        type: SUBMIT_POST,
        payload: response.data.post,
      })
    } catch (err) {
      console.error(err)
    }
  }

  const getUserPosts = async (selectedUserId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/posts/${selectedUserId}`
      )
      dispatch({
        type: GET_USER_POSTS,
        payload: response.data.userPosts,
      })
    } catch (err) {
      console.error(err)
    }
  }

  const deletePost = async (post_id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/posts/delete/${post_id}`
      )

      dispatch({
        type: DELETE_POST,
        payload: post_id,
      })
    } catch (err) {
      console.error(err)
    }
  }

  const submitComment = async (body) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/posts/new/comment/${body.post_id}`,
        body
      )
      dispatch({
        type: SUBMIT_COMMENT,
        payload: response.data.newComment,
      })
    } catch (err) {
      console.error(err)
    }
  }

  const deleteComment = async (comment_id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/posts/delete/comment/${comment_id}`
      )

      dispatch({
        type: DELETE_COMMENT,
        payload: {
          post_id: response.data.post_id,
          comment_id: response.data.comment_id,
        },
      })
    } catch (err) {
      console.error(err)
    }
  }

  const setDeleteModal = (id, contentType) => {
    dispatch({
      type: SET_DELETE_MODAL,
      payload: {
        id,
        contentType,
      },
    })
  }

  const clearDeleteModal = () => {
    dispatch({
      type: CLEAR_DELETE_MODAL,
    })
  }

  const setLoading = (loading) => {
    dispatch({
      type: SET_LOADING,
      payload: loading,
    })
  }

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        isLoading: state.isLoading,
        deleteAction: state.deleteAction,
        getUserPosts,
        submitPost,
        deletePost,
        submitComment,
        deleteComment,
        setDeleteModal,
        clearDeleteModal,
        setLoading,
      }}
    >
      {props.children}
    </PostContext.Provider>
  )
}

export default PostState
