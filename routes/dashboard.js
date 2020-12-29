const router = require('express').Router()
const db = require('../db')
const authorization = require('../middleware/authorization')

router.get('/', authorization, async (req, res) => {
  // send back current logged in user after token validation
  try {
    const user = await db.query('SELECT * FROM user_profile WHERE user_id=$1', [
      req.userID,
    ])
    const { first_name, last_name } = user.rows[0]
    res.json({
      id: req.userID,
      firstName: first_name,
      lastName: last_name,
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).json('Server Error')
  }
})

module.exports = router
