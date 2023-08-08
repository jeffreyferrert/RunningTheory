import React from 'react';
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTrackErrors, fetchTracks } from '../../store/tracks';
import { fetchComments, composeComment } from '../../store/comments';
import "./TrackShowPage.css"
import MapTrack from '../Map/MapTrack';

function TrackShowPage({ track }) {
  const dispatch = useDispatch();
  const { trackId } = useParams()
  const author = useSelector(state => state.session.user);
  const [newComment, setNewComment] = useState('')
  const [showCommentForm, setShowCommentForm] = useState(false)
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
      <div className="main-container-trackshow">
        <div className='ts-left-container'>

          <h2>Comments:</h2>
          <ul>
            {comments.map((comment, index) => (
              comment.track._id === trackId ? (
                <li key={index}>
                  <p>{comment.author.username}</p>
                  <p>{comment.description}</p>
                </li>
              ) : null
            ))}
          </ul>

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

        </div>

        <div className='ts-right-container'>
          <div className='ts-map'>
            {/* MAP COMPONENT GOES HERE */}
            <MapTrack />
          </div>
        </div>

      </div>

    </>

  );



}


export default TrackShowPage;