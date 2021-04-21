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

import { addPost, removePost, addComment, removeComment } from './postFunctions'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case GET_USER_POSTS:
      return {
        ...state,
        posts: action.payload,
        isLoading: false,
      }
    case SUBMIT_POST:
      return {
        ...state,
        posts: addPost(state.posts, action.payload),
        isLoading: false,
      }
    case DELETE_POST:
      return {
        ...state,
        posts: removePost(state.posts, action.payload),
      }
    case SUBMIT_COMMENT:
      return {
        ...state,
        posts: addComment(state.posts, action.payload),
      }
    case DELETE_COMMENT:
      return {
        ...state,
        posts: removeComment(state.posts, action.payload),
      }
    case SET_DELETE_MODAL:
      return {
        ...state,
        deleteAction: {
          showModal: true,
          id: action.payload.id,
          contentType: action.payload.contentType,
        },
      }
    case CLEAR_DELETE_MODAL:
      return {
        ...state,
        deleteAction: {
          showModal: false,
          id: '',
          contentType: '',
        },
      }
    case SET_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      }
    default:
      return state
  }
}
