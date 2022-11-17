// Write your code here
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails} = props
  const {id, userName, comment, isLiked, date, classNames} = commentDetails
  const profileName = userName ? userName[0].toUpperCase() : ''
  const commentedTime = formatDistanceToNow(date)

  const likeImg = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const isLikedClassName = isLiked ? 'comment-buttons liked' : 'comment-buttons'

  const onLikeAction = () => {
    const {toggleIsLiked} = props
    toggleIsLiked(id)
  }

  const onDeleteComment = () => {
    const {deleteComment} = props
    deleteComment(id)
  }

  return (
    <li className="list-item">
      <div className="comment-item-container">
        <div className={classNames}>
          <p className="initial-name">{profileName}</p>
        </div>
        <div>
          <div className="name-time-container">
            <p className="name">{userName}</p>
            <p className="time">{commentedTime}</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="buttons-container">
        <div className="like-container">
          <img src={likeImg} alt="like" className="like-image" />

          <button
            type="button"
            className={isLikedClassName}
            onClick={onLikeAction}
          >
            Like
          </button>
        </div>
        <button
          type="button"
          className="comment-buttons"
          onClick={onDeleteComment}
          testId="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            className="delete"
            alt="delete"
          />
        </button>
      </div>
      <hr className="break" />
    </li>
  )
}

export default CommentItem
