require('dotenv').config()
const express = require('express')
const app = express()
const db = require('./db')
const cors = require('cors')

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.use('/api/auth', require('./routes/userAuth'))

app.use('/api/user', require('./routes/userProfile'))

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})
