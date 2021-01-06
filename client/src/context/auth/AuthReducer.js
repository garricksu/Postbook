import {
  GET_LOGGED_IN_USER,
  CLEAR_LOGGED_IN_USER,
  LOGIN_USER,
  REGISTER_USER,
  AUTH_FAILED,
  SET_ERROR,
  CLEAR_ERROR,
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
      }
    case AUTH_FAILED:
      return {
        ...state,
        isAuthenticated: false,
      }
    case CLEAR_LOGGED_IN_USER:
      localStorage.removeItem('token')
      return {
        ...state,
        user: {},
        isAuthenticated: false,
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
    default:
      return state
  }
}
