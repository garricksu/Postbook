import UserState from './context/user/UserState'
import setAuthToken from './utils/setAuthToken'
import AuthCheck from './routing/AuthCheck'

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
