const router = require('express').Router()
const db = require('../db')
const authorization = require('../middleware/authorization')
const Constants = require('../utils/constant')

// create post
router.post('/new/:id', authorization, async (req, res) => {
  try {
    const { id, post_body } = req.body
    const newPost = await db.query(
      'INSERT INTO posts(user_id, post_body, created_at) VALUES($1, $2, current_timestamp) RETURNING *',
      [id, post_body]
    )

    res.json({
      post: newPost.rows[0]
    })
  } catch (err) {
    console.error(err.message)
    return res.status(500).json('Server Error')
  }
})

// get user post
router.get('/:id', authorization, async (req, res) => {
  try {
    const posts = await db.query('SELECT * FROM posts WHERE user_id=$1', [
      req.body.id,
    ])
    return res.json({
      userPosts: posts.rows
    })
  } catch (err) {
    console.error(err.message)
    return res.status(500).json('Server Error')
  }
})

// get dashboard posts

module.exports = router
