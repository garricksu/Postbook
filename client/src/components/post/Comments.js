import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import AuthContext from '../../context/auth/AuthContext'

import ContentOptions from './ContentOptions'

import { convertDate } from '../../utils/convertDate'
import profilePictureSrc from '../../assets/images/profile-picture.png'

const Comments = (props) => {
  const { comments } = props

  const authContext = useContext(AuthContext)
  const { loggedInUser } = authContext

  const returnComments = () => {
    if (comments.length !== 0) {
      return (
        <div>
          {comments.map((comment) => (
            <div key={comment.id}>
              <div className='d-flex justify-content-between'>
                <div className='d-flex align-items-center'>
                  <img
                    src={profilePictureSrc}
                    className='post-profile-picture border border-secondary rounded mr-3'
                    alt='profile'
                  />
                  <Link to={`/user/${comment.user_id}`}>
                    <h6 className='text-dark'>
                      {comment.first_name} {comment.last_name}
                    </h6>
                  </Link>
                </div>
                <div className='d-flex flex-column '>
                  <p className='my-0 small-font'>
                    {convertDate(comment.created_at)}
                  </p>
                  {loggedInUser.id === comment.user_id ? (<ContentOptions id={comment.id} contentType='comment' />) : null}
                </div>
              </div>
              <div>
                <p className='mx-6 comment-body'>{comment.comment_body}</p>
              </div>
            </div>
          ))}
        </div>
      )
    } else {
      return null
    }
  }

  return returnComments()
}

export default Comments
