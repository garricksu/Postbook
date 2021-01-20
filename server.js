require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.use('/api/auth', require('./routes/userAuth'))

app.use('/api/user', require('./routes/userProfile'))

app.use('/api/posts', require('./routes/posts'))

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})
