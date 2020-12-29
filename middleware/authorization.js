const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = async (req, res, next) => {
  //Check token is valid

  try {
    const jwtToken = req.header('x-auth-token')

    if (!jwtToken) {
      return res.status(403).json('Unauthorized Access')
    }

    const payload = jwt.verify(jwtToken, process.env.jwtSecret)

    req.userID = payload.userID
    next()
  } catch (err) {
    console.error(err.message)
    return res.status(400).json('Unauthorized Access')
  }
}
