
import React from 'react';
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTrackErrors, fetchTracks } from '../../store/tracks';
import { fetchComments } from '../../store/comments';


function TrackShowPage() {
  const dispatch = useDispatch();
  const { trackId } = useParams()
  const track = useSelector(state => state.tracks.all);
  // const comments = useSelector(state => sortComments(state.comments.all, trackId)) 
  const comments = useSelector(state => Object.values(state.comments.all))
  useEffect(() => {
    dispatch(fetchTracks())
 }, [dispatch, trackId])

 useEffect(() => {
    dispatch(fetchComments())
 }, [dispatch, trackId])

 console.log(comments)
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
            <p>{comment.author.username}</p>
            <p>{comment.description}</p>
          </li>
        ))}
      </ul>
    </>

  );



}


export default TrackShowPage;