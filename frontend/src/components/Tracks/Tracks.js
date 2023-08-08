import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTrackErrors, fetchTracks } from '../../store/tracks';
import TrackBox from './TrackBox';
import MapTracks from '../Map/MapTracks';
import "./Tracks.css"


import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';


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

  if (searchQuery) {
    tracks = tracks.filter(function (track) {
      return track.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.description.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }


  return (
    <>

      <div className="tracks-main-container">

        <div className="trackbox">
          {tracks.map(track => (
            <TrackBox key={track._id} track={track} />
          ))}
        </div>

        <div className="map">
          {/* <MapTracks tracks={tracks} /> */}
        </div>

      </div>

    </>
  );
}

export default Tracks;
