const router = require('express').Router()
const db = require('../db')
const authorization = require('../middleware/authorization')

router.get('/', authorization, async (req, res) => {
  try {
    const userDetails = await db.query(
      'SELECT * FROM user_profile WHERE user_id=$1',
      [req.user]
    )
    const { first_name, last_name } = userDetails.rows[0]
    res.json({
      loggedInUser: req.user,
      first_name,
      last_name,
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).json('Server Error')
  }
})

module.exports = router
