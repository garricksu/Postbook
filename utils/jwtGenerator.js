const jwt = require('jsonwebtoken')
require('dotenv').config()

const jwtGenerator = (loggedInUserId) => {
  const payload = {
    loggedInUserId
  }

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: 3600 })
}

module.exports = jwtGenerator
