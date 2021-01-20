const router = require('express').Router()
const db = require('../db')
const bcrypt = require('bcrypt')

const validInput = require('../middleware/validInput')
const authorization = require('../middleware/authorization')

const jwtGenerator = require('../utils/jwtGenerator')

router.post('/register', validInput, async (req, res) => {
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
      'INSERT INTO users(user_email, password) VALUES($1, $2) RETURNING *',
      [email, bcryptPassword]
    )
    const userID = await db.query('SELECT id FROM users WHERE user_email=$1', [
      email,
    ])
    const newUserDetails = await db.query(
      "INSERT INTO user_profile(user_id, first_name, last_name, birthday, updated_at) VALUES($1, $2, $3, TO_DATE($4, 'YYYY MON DD'), current_timestamp)",
      [userID.rows[0].id, first_name, last_name, birthday]
    )

    const token = jwtGenerator(newUser.rows[0].id)

    return res.json({ token })
  } catch (err) {
    console.error(err.message)
    return res.status(500).json('Server Error')
  }
})

router.post('/login', validInput, async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await db.query('SELECT * FROM users WHERE user_email=$1', [
      email,
    ])

    if (user.rows.length === 0) {
      return res.status(401).send('Email or Password is incorrect')
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password)

    if (!validPassword) {
      return res.status(401).send('Email or Password is incorrect')
    }

    const token = jwtGenerator(user.rows[0].id)

    return res.json({ token })
  } catch (err) {
    console.error(err.message)
    return res.status(500).json('Server Error')
  }
})

module.exports = router
