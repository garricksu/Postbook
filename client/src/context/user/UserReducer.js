import { GET_SELECTED_USER, CLEAR_SELECTED_USER} from '../types'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case GET_SELECTED_USER:
      return { ...state, selectedUser: action.payload }
      case CLEAR_SELECTED_USER:
        return {...state, selectedUser: action.payload}
    default:
      return state
  }
}
