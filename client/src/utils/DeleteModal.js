import React, { useContext } from 'react'
import PostContext from '../context/post/PostContext'

const DeleteModal = () => {
  const postContext = useContext(PostContext)
  const { deleteAction: {showModal, id, contentType}, clearDeleteModal, deletePost, deleteComment } = postContext

  const deleteContent = (e) => {
    e.preventDefault()
    if (contentType === 'post') {
      deletePost(id)
    }
    else if (contentType === 'comment') {
      deleteComment(id)
    }
    clearDeleteModal()
  }

  const returnModal = () => {
    console.log(showModal)
    return showModal ? (
      <div className='modal-overlay'>

        <div className='delete-modal bg-light mx-auto text-center py-4 border border-secondary rounded'>
        <p>Are you sure you want to delete this {contentType}?</p>
          <button
            type='button'
            className='btn btn-secondary mr-2'
            data-dismiss='modal'
            onClick={clearDeleteModal}
          >
            Cancel
          </button>
          <button
            type='button'
            className='btn btn-primary ml-2'
            data-dismiss='modal'
            onClick={deleteContent}
          >
            Confirm
          </button>
        </div>
      </div>
    ) : null
  }

  return <div>{returnModal()}</div>
}

export default DeleteModal
