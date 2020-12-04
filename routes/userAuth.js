const router = require('express').Router()
const db = require('../db')
const bcrypt = require('bcrypt')
const jwtGenerator = require('../utils/jwtGenerator')
const validInput = require('../middleware/validInput')
const authorization = require('../middleware/authorization')

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

    const token = jwtGenerator(newUser.rows[0].id)

    res.json({ token })

    res.json(newUser.rows[0])
  } catch (err) {
    console.error(err.message)
    res.status(500).json('Server Error')
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

    res.json({ token })
  } catch (err) {
    console.error(err.message)
    res.status(500).json('Server Error')
  }
})

router.get('/verify_session', authorization, async (req, res) => {
  try {
    res.json(true)
  } catch (err) {
    console.error(err.message)
    res.status(500).json('Server Error')
  }
})

module.exports = router
