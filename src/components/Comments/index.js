import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

class Comments extends Component {
  state = {commentsList: [], userName: '', comment: ''}

  deleteComment = commentId => {
    const {commentsList} = this.state
    this.setState({
      commentsList: commentsList.filter(
        deleteComment => deleteComment.id !== commentId,
      ),
    })
  }

  isLikedToggle = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  fetchCommentsList = () => {
    const {commentsList} = this.state
    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLiked={this.isLikedToggle}
        deleteComment={this.deleteComment}
      />
    ))
  }

  onSubmit = event => {
    event.preventDefault()
    const {userName, comment} = this.state

    const backgroundClassName = `container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: uuidv4(),
      userName,
      comment,
      date: new Date(),
      isLiked: false,
      classNames: backgroundClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      userName: '',
      comment: '',
    }))
  }

  onNameChange = event => {
    this.setState({
      userName: event.target.value,
    })
  }

  comment = event => {
    this.setState({
      comment: event.target.value,
    })
  }

  render() {
    const {userName, comment, commentsList} = this.state

    return (
      <div className="bg-container">
        <div className="comments-container">
          <div className="comment-card">
            <form className="form" onSubmit={this.onSubmit}>
              <h1 className="heading">Comments</h1>
              <p className="description">
                Say something about 4.0 Technologies
              </p>
              <input
                type="text"
                className="name-input"
                placeholder="Your Name"
                value={userName}
                onChange={this.onNameChange}
              />
              <textarea
                placeholder="Your Comment"
                className="comment-input"
                value={comment}
                onChange={this.comment}
                rows="6"
              />
              <button type="submit" className="button">
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="image"
            />
          </div>
          <hr className="break" />
          <p className="comment-counter">
            <span className="counter">{commentsList.length}</span> Counter
          </p>
          <ul className="all-comments-container">{this.fetchCommentsList()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments
