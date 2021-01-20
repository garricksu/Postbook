import {
  GET_USER_POSTS,
  DELETE_POST,
  GET_DASHBOARD_POSTS,
  SET_LOADING,
} from '../types'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case GET_USER_POSTS:
      return {
        ...state,
        posts: action.payload,
        isLoading: false
      }
    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    default:
      return state
  }
}
