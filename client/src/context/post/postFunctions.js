export const addPost = (posts, newPost) => {
  return [{ ...newPost, comments: [] }, ...posts]
}

export const removePost = (posts, deletedPostID) => {
  return posts.filter((post) => post.id !== deletedPostID)
}

export const addComment = (posts, newComment) => {
  return posts.map((post) => {
    if (post.id === newComment.post_id) {
      return { ...post, comments: [...post.comments, newComment] }
    } else {
      return post
    }
  })
}

export const removeComment = (posts, deletedComment) => {
  return posts.map((post) => {
    if (post.id === deletedComment.post_id) {
      return {
        ...post,
        comments: post.comments.filter(
          (comment) => comment.id !== deletedComment.comment_id
        ),
      }
    } else {
      return post
    }
  })
}
