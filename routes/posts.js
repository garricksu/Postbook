const router = require('express').Router()
const db = require('../db')
const authorization = require('../middleware/authorization')

// create post
router.post('/new/:id', authorization, async (req, res) => {
  try {
    const { id, post_body } = req.body
    const newPost = await db.query(
      'INSERT INTO posts(user_id, post_body) VALUES($1, $2) RETURNING *',
      [id, post_body]
    )
    const post_id = newPost.rows[0].id
    const newPostDetailed = await db.query(
      'SELECT posts.id, posts.user_id, posts.post_body, posts.created_at, user_profile.first_name, user_profile.last_name FROM posts INNER JOIN user_profile ON posts.user_id=user_profile.user_id WHERE posts.id = $1',
      [post_id]
    )

    res.json({
      post: newPostDetailed.rows[0],
    })
  } catch (err) {
    console.error(err.message)
    return res
      .status(500)
      .json(`Server Error. Post could not be created for user ${req.body.id}.`)
  }
})

// get user post
router.get('/:id', authorization, async (req, res) => {
  try {
    const postsQuery = await db.query(
      'SELECT posts.id, posts.user_id, posts.post_body, posts.created_at, user_profile.first_name, user_profile.last_name FROM posts INNER JOIN user_profile ON posts.user_id=user_profile.user_id WHERE posts.user_id = $1 ORDER BY posts.created_at DESC',
      [req.params.id]
    )
    let posts = postsQuery.rows
    let postsWithComments = await Promise.all(
      posts.map(async (post, index) => {
        const comments = await db.query(
          'SELECT posts_comments.id, posts_comments.post_id, posts_comments.user_id, posts_comments.comment_body, posts_comments.created_at, user_profile.first_name, user_profile.last_name FROM posts_comments INNER JOIN user_profile ON posts_comments.user_id=user_profile.user_id WHERE posts_comments.post_id=$1 ORDER BY posts_comments.created_at ASC',
          [post.id]
        )
        return comments !== undefined
          ? { ...post, comments: comments.rows }
          : { ...post, comments: [] }
      })
    )

    return res.json({
      userPosts: postsWithComments,
    })
  } catch (err) {
    console.error(err.message)
    return res
      .status(500)
      .json(`Server Error. Post ${req.params.id} could not be retrieved.`)
  }
})

// delete selected post
router.delete('/delete/:post_id', authorization, async (req, res) => {
  try {
    const deletePost = await db.query('DELETE FROM posts WHERE id=$1', [
      req.params.post_id,
    ])

    return res.status(200).json(`Post ${req.params.id} Deleted`)
  } catch (err) {
    console.error(err.message)
    return res
      .status(500)
      .json(`Server Error. Post ${req.params.post_id} could not be deleted.`)
  }
})

// comment on post
router.post('/new/comment/:id', authorization, async (req, res) => {
  try {
    const { user_id, post_id, comment_body } = req.body
    const newComment = await db.query(
      'INSERT INTO posts_comments(user_id, post_id, comment_body) VALUES($1, $2, $3) RETURNING *',
      [user_id, post_id, comment_body]
    )
    const detailedComment = await db.query(
      'SELECT posts_comments.id, posts_comments.post_id, posts_comments.user_id, posts_comments.comment_body, posts_comments.created_at, user_profile.first_name, user_profile.last_name FROM posts_comments INNER JOIN user_profile ON posts_comments.user_id=user_profile.user_id WHERE posts_comments.id=$1',
      [newComment.rows[0].id]
    )

    res.json({
      newComment: detailedComment.rows[0],
    })
  } catch (err) {
    console.error(err.message)
    return res
      .status(500)
      .json(
        `Server Error. Comments for post ${req.body.post_id} could not be retreived`
      )
  }
})

// delete comment
router.delete(
  '/delete/comment/:comment_id',
  authorization,
  async (req, res) => {
    try {
      const deletedComment = await db.query(
        'DELETE FROM posts_comments WHERE id=$1 RETURNING id, post_id',
        [req.params.comment_id]
      )

      const { post_id, id } = deletedComment.rows[0]

      return res.json({
        post_id,
        comment_id: id,
      })
    } catch (err) {
      console.error(err.message)
      return res
        .status(500)
        .json(
          `Server Error. Comment ${req.params.comment_id} could not be deleted.`
        )
    }
  }
)

// get dashboard posts

module.exports = router
