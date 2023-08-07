import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTrackErrors, fetchTracks } from '../../store/tracks';
import TrackBox from './TrackBox';

function Tracks () {
  const dispatch = useDispatch();
  const tracks = useSelector(state => Object.values(state.tracks.all));
  
  useEffect(() => {
    dispatch(fetchTracks());
    return () => dispatch(clearTrackErrors());
  }, [dispatch])

  if (tracks.length === 0) return <div>There are no Tracks</div>;
  
  return (
    <>
        <h2 id="all-tracks">All Tracks</h2> 
    <div className="tracks-main-container">



      <div className="trackbox"> 

      {tracks.map(track => (
        <TrackBox key={track._id} track={track} />
      ))}
      </div>

      <div className="map">

      </div>
    </div>
    </>
  );
}

export default Tracks;
