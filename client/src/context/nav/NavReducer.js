import { SET_ACTIVE} from '../types'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case SET_ACTIVE:
      return {
        ...state,
        active: action.payload,
        isLoading: false
      }
    default:
      return state
  }
}
