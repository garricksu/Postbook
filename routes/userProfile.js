const router = require('express').Router()
const db = require('../db')
const authorization = require('../middleware/authorization')
const calculateAge = require('../utils/calculateAge')
const Constants = require('../utils/constant')

const { months, validUUID } = Constants

// send back current logged in user after token validation
router.get('/loggedInUser', authorization, async (req, res) => {
  try {
    const user = await db.query('SELECT * FROM user_profile WHERE user_id=$1', [
      req.loggedInUserId,
    ])
    const { first_name, last_name } = user.rows[0]
    return res.json({
      id: req.loggedInUserId,
      firstName: first_name,
      lastName: last_name,
    })
  } catch (err) {
    console.error(err.message)
    return res.status(500).json('Server Error')
  }
})

// send back current selected in user after token validation
router.get('/profile', authorization, async (req, res) => {
  try {
    if (!validUUID.test(req.query.selectedUserId)) {
      throw 'Invalid input for ID, requires UUID format'
    }
    const user = await db.query('SELECT * FROM user_profile WHERE user_id=$1', [
      req.query.selectedUserId,
    ])
    if (user.rows.length === 0) {
      console.log('No user found with ID')
      return res.status(404).json('User Not Found')
    }
    const { first_name, last_name, birthday, bio, occupation } = user.rows[0]
    const birthdayDate = new Date(birthday)
    const age = calculateAge(birthdayDate)
    return res.json({
      id: req.query.selectedUserId,
      firstName: first_name,
      lastName: last_name,
      birthday: {
        month: months[birthdayDate.getMonth()],
        day: birthdayDate.getDay(),
        year: birthdayDate.getFullYear(),
      },
      age,
      bio,
      occupation,
    })
  } catch (err) {
    console.error(err)
    return res.status(404).json('User Not Found')
  }
})

router.post('/profile/update', authorization, async (req, res) => {
  // update user bio/occupation
  try {
    const { id, occupation, bio } = req.body
    const updatedProfile = await db.query(
      'UPDATE user_profile SET occupation=$1, bio=$2 WHERE user_id=$3 RETURNING *',
      [occupation, bio, id]
    )
    const { user_id } = updatedProfile.rows[0]
    return res.json({
      id: user_id,
    })
  } catch (err) {
    console.error(err.message)
    return res.status(500).json('Server Error')
  }
})

module.exports = router
