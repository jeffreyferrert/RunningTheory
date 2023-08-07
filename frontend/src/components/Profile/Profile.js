import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserTracks, clearTrackErrors } from '../../store/tracks';
import TrackBox from '../Tracks/TrackBox';

function Profile () {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const userTracks = useSelector(state => Object.values(state.tracks.user))
  
  useEffect(() => {
    dispatch(fetchUserTracks(currentUser._id));
    return () => dispatch(clearTrackErrors());
  }, [currentUser, dispatch]);

  if (userTracks.length === 0) {
    return <div>{currentUser.username} has no Tracks</div>;
  } else {
    return (
      <>
        <h2>All of {currentUser.username}'s Tracks</h2>
        {userTracks.map(track => (
          <TrackBox
            key={track._id}
            track={track}
          />
        ))}
      </>
    );
  }
}

export default Profile;
