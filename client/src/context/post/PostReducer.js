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
        posts: [{ ...action.payload, comments: [] }, ...state.posts],
        isLoading: false,
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      }
    case SUBMIT_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.post_id
            ? { ...post, comments: [...post.comments, action.payload] }
            : post
        ),
      }
    case DELETE_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.post_id
            ? {
                ...post,
                comments: post.comments.filter(
                  (comment) => comment.id !== action.payload.comment_id
                ),
              }
            : post
        ),
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
