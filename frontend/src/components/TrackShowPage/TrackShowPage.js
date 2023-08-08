
import React from 'react';
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTrackErrors, fetchTracks } from '../../store/tracks';
import { fetchComments, composeComment } from '../../store/comments';


function TrackShowPage() {
  const dispatch = useDispatch();
  const { trackId } = useParams()
  console.log(track)
  const track = useSelector(state => state.tracks.all);
  const author = useSelector(state => state.session.user);

  const [newComment, setNewComment] = useState('')
  // const comments = useSelector(state => sortComments(state.comments.all, trackId)) 
  const comments = useSelector(state => Object.values(state.comments.all))
  useEffect(() => {
    dispatch(fetchTracks())
 }, [dispatch, trackId])

 useEffect(() => {
    dispatch(fetchComments())
 }, [dispatch, trackId])

 console.log(comments)

function handleSubmit(e){
  e.preventDefault()
  dispatch(composeComment({description: newComment, author: author, track: trackId}))
}
  return (
    <>
    <div className="hi">
      <p>Track Name: {track.name}</p>
      <p>Location: {track.location}</p>
      <p>Length: {track.miles} miles</p>
      <p>Description: {track.description}</p>
    </div>
    <h2>Comments:</h2>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            {/* <p>{comment.author.username}</p>
            <p>{comment.description}</p> */}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <h3>Create Comment</h3>
        <label>Description
        <input type="text" value={newComment} name="newComment" 
               onChange={(e) => {setNewComment(e.target.value)}}/>
        </label>
        
        <input type="submit" value={`New Comment`}/>
      </form>
    </>

  );



}


export default TrackShowPage;