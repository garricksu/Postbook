const router = require('express').Router()
const db = require('../db')
const bcrypt = require('bcrypt')

router.post('/register', async (req, res) => {
  try {
    const { email, password, first_name, last_name, birthday } = req.body

    const userExists = await db.query(
      'SELECT * FROM users WHERE user_email=$1',
      [email]
    )

    if (userExists.rows.length !== 0) {
      return res.status(401).send('User already exists')
    }

    const saltRound = 10
    const salt = await bcrypt.genSalt(saltRound)

    const bcryptPassword = await bcrypt.hash(password, salt)

    const newUser = await db.query(
      'INSERT INTO users(user_email, password, created_at, updated_at) VALUES($1, $2, current_timestamp, current_timestamp) RETURNING *',
      [email, bcryptPassword]
    )
    const userID = await db.query('SELECT id FROM users WHERE user_email=$1', [
      email,
    ])
    const newUserDetails = await db.query(
      "INSERT INTO user_profile(user_id, first_name, last_name, birthday, updated_at) VALUES($1, $2, $3, TO_DATE($4, 'YYYY MONTH DD'), current_timestamp)",
      [userID.rows[0].id, first_name, last_name, birthday]
    )

    res.json(newUser.rows[0])
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
