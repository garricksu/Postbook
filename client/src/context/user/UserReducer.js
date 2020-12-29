import {
  GET_USER,
  CLEAR_USER,
  LOGIN_USER,
  REGISTER_USER,
  AUTH_FAILED
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
    case GET_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      }
      case AUTH_FAILED:
        return {
          ...state,
          isAuthenticated: false
        }
    default:
      return state
  }
}
