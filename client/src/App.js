import UserState from './context/user/UserState'

import AuthCheck from './routing/AuthCheck'

import setAuthToken from './utils/setAuthToken'
import './App.scss'


function App() {
  if(localStorage.token) {
    setAuthToken(localStorage.token)
  }
  return (
    <UserState>
      <AuthCheck />
    </UserState>
  )
}

export default App
