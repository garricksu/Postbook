import React, { useReducer } from 'react'
import NavContext from './NavContext'
import NavReducer from './NavReducer'
import { SET_ACTIVE} from '../types'

const NavState = (props) => {
  const initialState = {
    active: 0,
  }

  const [state, dispatch] = useReducer(NavReducer, initialState)

  const setActiveLink = (index) => {
    dispatch({ type: SET_ACTIVE, payload: index })
  }

  return (
    <NavContext.Provider
      value={{
        active: state.active,
        isLoading: state.isLoading,
        setActiveLink,
      }}
    >
      {props.children}
    </NavContext.Provider>
  )
}

export default NavState
