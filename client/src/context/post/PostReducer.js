import {
  GET_USER_POSTS,
  CREATE_POST,
  DELETE_POST,
  GET_DASHBOARD_POSTS,
  SET_LOADING,
} from '../types'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
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
