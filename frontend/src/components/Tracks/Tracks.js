import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTrackErrors, fetchTracks } from '../../store/tracks';
import TrackBox from './TrackBox';
import MapTracks from '../Map/MapTracks';

import MapTrack from '../Map/MapTrack';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import "./Tracks.css"

function Tracks() {
  const dispatch = useDispatch();
  let tracks = useSelector(state => Object.values(state.tracks.all));
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('search');

  useEffect(() => {
    dispatch(fetchTracks());
    return () => dispatch(clearTrackErrors());
  }, [dispatch])

  if (tracks.length === 0) return <div>There are no Tracks</div>;

  console.log(tracks)

  if (searchQuery) {
    tracks = tracks.filter(function (track) {
      return track.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.description.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }

  return (
    <>
      <div className="tracks-main-container">
        <div className="trackbox">
          {/* <h2 id="all-tracks">All Tracks</h2> */}

          {tracks.map(track => (
            <TrackBox key={track._id} track={track} />
          ))}
        </div>


      <div className="trackbox"> 

      {tracks.map(track => (
        <TrackBox key={track._id} track={track} />
      ))}
      </div>

      <div className="map">
          {/* <img src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/w_2560%2Cc_limit/GoogleMapTA.jpg"></img> */}
          <MapTracks tracks={tracks}/>
          
          {/* <MapTrack /> */}

      </div>
    </>
  );
}

export default Tracks;
