import axios from 'axios'
import * as Constants from '../utils/constants'

const setAuthToken = (token) => {
  const { xAuthToken } = Constants
  if (token) {
    axios.defaults.headers.common[xAuthToken] = token
  } else {
    delete axios.defaults.headers.common[xAuthToken]
  }
}

export default setAuthToken
