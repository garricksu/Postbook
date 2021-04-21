import {
  GET_SELECTED_USER,
  CLEAR_SELECTED_USER,
  SEARCH_USER,
  CLEAR_SEARCH,
  SET_LOADING,
} from '../types'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case GET_SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload,
        isLoading: false,
      }
    case CLEAR_SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload,
        isLoading: false,
      }
    case SEARCH_USER:
      return {
        ...state,
        userSearchList: action.payload,
      }
    case CLEAR_SEARCH:
      return {
        ...state,
        userSearchList: [],
      }
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }
    default:
      return state
  }
}
