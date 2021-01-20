const router = require('express').Router()
const db = require('../db')
const authorization = require('../middleware/authorization')
const Constants = require('../utils/constant')

// create post
router.post('/new/:id', authorization, async (req, res) => {
  try {
    const { id, post_body } = req.body
    const newPost = await db.query(
      'INSERT INTO posts(user_id, post_body) VALUES($1, $2) RETURNING *',
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
    const posts = await db.query('SELECT posts.id, posts.user_id, posts.post_body, posts.created_at, user_profile.first_name, user_profile.last_name FROM posts INNER JOIN user_profile ON posts.user_id=user_profile.user_id WHERE posts.user_id = $1 ORDER BY posts.created_at DESC', [
      req.params.id,
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
