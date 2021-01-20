import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import PostContext from '../../context/post/PostContext'
import UserContext from '../../context/user/UserContext'

import * as Constants from '../../utils/constants'
import profilePicture from '../../assets/images/profile-picture.png'

const Posts = () => {
  const postContext = useContext(PostContext)
  const { posts } = postContext

  const userContext = useContext(UserContext)
  const { clearSelectedUser } = userContext

  const { months } = Constants

  // Will make into separate function
  const convertDate = (date) => {
    const dateObj = new Date(date)
    const month = months[dateObj.getMonth()]
    const day = dateObj.getDate()
    const year = dateObj.getFullYear()
    const minutes = dateObj.getMinutes()
    const hours = dateObj.getHours()
    let time
    if (hours === 0) {
      time = `12:${minutes}AM`
    } else if (hours > 12) {
      time = `${hours - 12}:${minutes}PM`
    } else {
      time = `${hours}:${minutes}AM`
    }
    const convertedDateTime = `${month} ${day}, ${year} at ${time}`
    return <p className='my-0 small-font'>{convertedDateTime}</p>
  }

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
            <p className='card-text'>{post.post_body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Posts
