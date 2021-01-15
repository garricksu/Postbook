const jwt = require('jsonwebtoken')
require('dotenv').config()
const Constants = require('../utils/constant')

module.exports = async (req, res, next) => {
  //Check token is valid
  const {xAuthToken} = Constants
  try {
    const jwtToken = req.header(xAuthToken)

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
