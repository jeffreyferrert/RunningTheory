import React from 'react';
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import tracksReducer, { clearTrackErrors, fetchTracks } from '../../store/tracks';
import { fetchComments, composeComment } from '../../store/comments';
import { fetchTimes, composeTime } from '../../store/times.js';
import "./TrackShowPage.css"
import MapTrack from '../Map/MapTrack';
import Comment from './Comment';
import Time from './Time';

function TrackShowPage() {
  const dispatch = useDispatch();
  const { trackId } = useParams()
  const author = useSelector(state => state.session.user);
  const [newComment, setNewComment] = useState('')
  const [showCommentForm, setShowCommentForm] = useState(false)
  
  const comments = useSelector(state => Object.values(state.comments.all))
  const times = useSelector(state => Object.values(state.times.all))
  const [time, setTime] = useState(0)
  
  useEffect(() => {
    dispatch(fetchTracks())
    dispatch(fetchComments())
    dispatch(fetchTimes())
  }, [dispatch, trackId])
  
  const track = useSelector(state => Object.values(state.tracks.all).find(track => track._id === trackId))

  function handleSubmit(e) {
    e.preventDefault() 
    dispatch(composeComment({ description: newComment, author: author, track: track }))
    setShowCommentForm(false)
  }

  function handleTimeSubmit(e) {
    let arrTime = time.split(":")
    if(arrTime.length === 3){
      dispatch(composeTime({hours: arrTime[0], minutes: arrTime[1], seconds: arrTime[2], author: author, track: track}))
    } else if (arrTime.length === 2){
      dispatch(composeTime({hours: 0, minutes: arrTime[0], seconds: arrTime[1], author: author, track: track}))
    } else {
      dispatch(composeTime({hours: 0, minutes: 0, seconds: arrTime[0], author: author, track: track}))
    }
  }
  return (
    <>

            {/* <div className="img">
              <img src="https://www.esbnyc.com/sites/default/files/2020-01/ESB%20Day.jpg"></img>
            </div> */}
      <div className="main-container-trackshow">
        <div className='ts-left-container'>
        {track && (
          <>
            <h1>{track.name}</h1>
            <div className="track-container">
              <h2>General Info</h2>
              <div className ="track-general-info">
                <span>Starting Line:</span> {track.startAddress}
                <br />
                <span>Finish Line:</span> {track.endAddress}
                <br />
                <span>Distance:</span> {track.miles} miles
                <br />
                <span>Description:</span> {track.description}
              </div>
            </div>
          </>
        )}

          <div className="track-container">
            <h2>Leaderboard</h2>
            <ol>
              {times.map((time, index) => (
                // <div className={`leaderboard${index}`}>{time}</div>
                <li className={index} key={index}>
                  <Time key={index} time={time}  />
                </li>
              ))}
            </ol>

            <form onSubmit={handleTimeSubmit}>

              <input
                className="time-bar"
                type="string"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              <button className="track-btns" type="submit">Add Your Time</button>


            </form>
            {/* <button className="track-add-time">
              <span>Add Time</span>
            </button> */}
          </div>


          <div className="track-container">
            <h2>Comments</h2>
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
                  <input className="comment-btns" type="submit" value={`Add Comment`} />
                </form>
                <button className="track-btns" onClick={() => setShowCommentForm(false)}>Hide Comment Form</button>
              </div>
            ) : (
              <button className="track-btns" onClick={() => setShowCommentForm(true)}>Show Comment Form</button>
            )}
        </div>



      </div>

      <div className='ts-right-container'>
        <div className='ts-map'>
          {/* MAP COMPONENT GOES HERE */}
          <MapTrack />
        </div>
      </div>

    </div >

    </>

  );



}


export default TrackShowPage;