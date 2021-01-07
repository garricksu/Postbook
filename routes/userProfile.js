const router = require('express').Router()
const db = require('../db')
const authorization = require('../middleware/authorization')

router.get('/loggedInUser', authorization, async (req, res) => {
  // send back current logged in user after token validation
  try {
    const user = await db.query('SELECT * FROM user_profile WHERE user_id=$1', [
      req.loggedInUserId,
    ])
    const { first_name, last_name } = user.rows[0]
    res.json({
      id: req.loggedInUserId,
      firstName: first_name,
      lastName: last_name,
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).json('Server Error')
  }
})

router.get('/profile', authorization, async (req, res) => {
  // send back current logged in user after token validation
  try {
    console.log(req)
    const user = await db.query('SELECT * FROM user_profile WHERE user_id=$1', [
      req.query.selectedUserId,
    ])
    const { first_name, last_name, birthday, bio, occupation } = user.rows[0]
    res.json({
      id: req.query.selectedUserId,
      firstName: first_name,
      lastName: last_name,
      birthday,
      bio,
      occupation,
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).json('Server Error')
  }
})
module.exports = router
