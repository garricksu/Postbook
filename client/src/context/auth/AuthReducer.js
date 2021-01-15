import {
  GET_LOGGED_IN_USER,
  CLEAR_LOGGED_IN_USER,
  LOGIN_USER,
  REGISTER_USER,
  AUTH_FAILED,
  SET_ERROR,
  CLEAR_ERROR,
  SET_LOADING
} from '../types'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
    case REGISTER_USER:
      localStorage.setItem('token', action.payload)
      return {
        ...state,
        isAuthenticated: true,
      }
    case GET_LOGGED_IN_USER:
      return {
        ...state,
        isAuthenticated: true,
        loggedInUser: action.payload,
        isLoading: false
      }
    case AUTH_FAILED:
    case CLEAR_LOGGED_IN_USER:
      localStorage.removeItem('token')
      return {
        ...state,
        user: {},
        isAuthenticated: false,
        isLoading: false
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    default:
      return state
  }
}
