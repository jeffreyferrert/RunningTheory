import React from 'react';
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTrackErrors, fetchTracks } from '../../store/tracks';
import { fetchComments, composeComment } from '../../store/comments';

///
function TrackShowPage({ track }) {
  const dispatch = useDispatch();
  const { trackId } = useParams()
  // console.log(track)
  // const track = useSelector(state => state.tracks.all);
  const author = useSelector(state => state.session.user);
  console.log(author)
  const [newComment, setNewComment] = useState('')
  const [editComment, setEditComment] = useState("")
  const [showCommentForm, setShowCommentForm] = useState(false)
  const [editCommentForm, setEditCommentForm] = useState(false)
  // const comments = useSelector(state => sortComments(state.comments.all, trackId)) 
  const comments = useSelector(state => Object.values(state.comments.all))
  useEffect(() => {
    dispatch(fetchTracks())
  }, [dispatch, trackId])

  useEffect(() => {
    dispatch(fetchComments())
  }, [dispatch, trackId])

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(composeComment({ description: newComment, author: author, track: track }))
    setShowCommentForm(false)
  }
  return (
    <>
      <div className="track-description">
        {/* <p>Track Name: {track.name}</p>
      <p>Location: {track.location}</p>
      <p>Length: {track.miles} miles</p>
      <p>Description: {track.description}</p> */}
      </div>
      <h2>Comments:</h2>
      <ul>
        {comments.map((comment, index) => (
          comment.track._id === trackId ? (
            <li key={index}>
              <p>{comment.author.username}</p>
              <p>{comment.description}</p>
              {comment.author._id === author._id && !editCommentForm && (
                <button onClick={() => {
                  setEditCommentForm(true)
                  setEditComment(comment.description)
                }}>Edit Comment</button>
              )}
              {comment.author._id === author._id && editCommentForm && (
                <form>
                  <label>Edit Comment
                    <input
                      type="text"
                      value={editComment}
                      name="newComment"
                      onChange={(e) => { setEditComment(e.target.value) }}
                    />
                  </label>
                <input type="submit" value={`Edit Comment`} />
                </form>
              )}
            </li>
          ) : null
        ))}
      </ul>

      {/* <form onSubmit={handleSubmit}>
        <h3>Create Comment</h3>
        <label>Description
          <input type="text" value={newComment} name="newComment"
            onChange={(e) => { setNewComment(e.target.value) }} />
        </label>

        <input type="submit" value={`New Comment`} />
      </form> */}
      {showCommentForm ? (
        <div>
          <form onSubmit={handleSubmit}>
            <h3>Create Comment</h3>
            <label>Description
              <input
                type="text"
                value={newComment}
                name="newComment"
                onChange={(e) => { setNewComment(e.target.value) }}
              />
            </label>
            <input type="submit" value={`New Comment`} />
          </form>
          <button onClick={() => setShowCommentForm(false)}>Hide Comment Form</button>
        </div>
      ) : (
        <button onClick={() => setShowCommentForm(true)}>Show Comment Form</button>
      )}
    </>

  );



}


export default TrackShowPage;