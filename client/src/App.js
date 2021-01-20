import AuthState from './context/auth/AuthState'
import NavState from './context/nav/NavState'
import UserState from './context/user/UserState'
import PostState from './context/post/PostState'

import AuthCheck from './routing/AuthCheck'

import setAuthToken from './utils/setAuthToken'
import './App.scss'

function App() {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  return (
    <AuthState>
      <NavState>
        <UserState>
          <PostState>
            <AuthCheck />
          </PostState>
        </UserState>
      </NavState>
    </AuthState>
  )
}

export default App
