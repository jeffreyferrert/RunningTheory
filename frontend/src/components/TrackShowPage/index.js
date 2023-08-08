import React from 'react';
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import tracksReducer, { clearTrackErrors, fetchTracks } from '../../store/tracks';
import { fetchComments, composeComment } from '../../store/comments';
import "./TrackShowPage.css"
import MapTrack from '../Map/MapTrack';
import Comment from './Comment';

function TrackShowPage() {
  const dispatch = useDispatch();
  const { trackId } = useParams()
  const author = useSelector(state => state.session.user);
  const [newComment, setNewComment] = useState('')
  const [showCommentForm, setShowCommentForm] = useState(false)
  const track = useSelector(state => Object.values(state.tracks.all).find(track => track._id === trackId))

  const comments = useSelector(state => Object.values(state.comments.all))
  const [time, setTime] = useState(0)

  useEffect(() => {
    dispatch(fetchTracks())
    dispatch(fetchComments())
  }, [dispatch, trackId])

  function handleSubmit(e) {
    // e.preventDefault()
    dispatch(composeComment({ description: newComment, author: author, track: track }))
    setShowCommentForm(false)
  }

  function handleTimeSubmit(e) {
    e.preventDefault()
    setTime(0)
  }
  return (
    <>

      <div className="main-container-trackshow">
        <div className='ts-left-container'>
          <h1>Track Name</h1>
          <div className="track-container">
            <h2>General Info</h2>
            <span>Starting Line: </span> test
            <br></br>
            <span>Finish Line: </span> test
            <br></br>
            <span>Distance: </span> 88 miles
            <br></br>
            <span>Description: </span> weiruhweiruwheriuwheriuhweriuhweiurhwieurhwuierhewiurew
          </div>

          <div className="track-container">
            <h2>Leaderboard</h2>
            1. DEMO
            <br></br>
            2. DEMO
            <br></br>
            3. DEMO
            <br></br>
            4. DEMO
            <br></br>

            <form onSubmit={handleTimeSubmit}>
  
                <input
                  className="time-bar"
                  type="integer"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
                <button className="track-add-time" type="submit">Add Your Time</button>


            </form>
            {/* <button className="track-add-time">
              <span>Add Time</span>
            </button> */}
          </div>


          <div className="track-container">
             <h2>Comments:</h2>
      <ul>
        {comments.map((comment, index) => (
          <Comment key={index} comment={comment} author={author} track={track} />
        ))}
      </ul>

          {showCommentForm ? (
            <div>
              <form onSubmit={(e) => handleSubmit(e)}>
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
            ) : (
              <button onClick={() => setShowCommentForm(true)}>Show Comment Form</button>
            )}
          </div>
          
          <div className="track-container">
            <h2>Other Tracks</h2>

          </div>
            

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