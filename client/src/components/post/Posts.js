import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import PostContext from '../../context/post/PostContext'
import UserContext from '../../context/user/UserContext'

import Comments from './Comments'
import CreateComment from './CreateComment'

import { convertDate } from '../../utils/convertDate'
import profilePicture from '../../assets/images/profile-picture.png'

const Posts = () => {
  const postContext = useContext(PostContext)
  const { posts } = postContext

  return (
    <div>
      {posts.map((post) => (
        <div className='card text-dark bg-light mb-3' key={post.id}>
          <div className='card-header d-flex justify-content-between'>
            <div className='d-flex align-items-center '>
              <img
                src={profilePicture}
                alt='profile'
                className='post-profile-picture border border-secondary rounded mr-3'
                id='profile-picture'
              />
              <Link to={`/user/${post.user_id}`}>
                <h6 className='text-dark'>
                  {post.first_name} {post.last_name}
                </h6>
              </Link>
            </div>
            <div className='d-flex align-items-end'>
              {convertDate(post.created_at)}
            </div>
          </div>
          <div className='card-body'>
            <p className='card-text font-weight-bold'>{post.post_body}</p>
          </div>
          <div className='card'>
            <div className='card-body'>
              <Comments comments={post.comments} />
              <CreateComment post_id={post.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Posts
