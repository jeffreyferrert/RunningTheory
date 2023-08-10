import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserTracks, clearTrackErrors } from '../../store/tracks';
import { fetchUserTimes, clearTimeErrors } from "../../store/times";
import TrackBox from '../Tracks/TrackBox';
import Time from '../TrackShowPage/Time'
import './Profile.css'

function Profile() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const userTracks = useSelector(state => Object.values(state.tracks.user))
  const userTimes = useSelector(state => Object.values(state.times.user))

  useEffect(() => {
    dispatch(fetchUserTracks(currentUser._id));
    dispatch(fetchUserTimes(currentUser._id))
    return () => {
      dispatch(clearTrackErrors())
      dispatch(clearTimeErrors)
    };
  }, [currentUser, dispatch]);

  // if (userTracks.length === 0) {
  //   return <div>{currentUser.username} has no Tracks</div>;
  // } else {
  return (
    <>
      <div className='user-header'>
        <div className="profile-demo">
          <p className='single-letter'>{currentUser.username[0].toUpperCase()}</p>
        </div>
        <h2 className='welcome-user'>{currentUser.username}'s stats and tracks</h2>
      </div>
      <div className="profile-container">
        <img id='user-img' alt='hihi-img' src='/UserBackSplash.jpg'></img>
        <div className="profile-times-outer">
          <h2>All of {currentUser.username}'s Times</h2>
          {userTimes.length === 0 ? (
            <p className="no-race-message">Go out and run your first race!</p>
          ) : (
            <div className="profile-times-inner">
              {userTimes && (userTimes.map((time, index) => (
                <li className={index}>
                  <Time key={index} time={time} currUser={currentUser} />

                </li>
              )))
              }
            </div>
          )}
        </div>
        <div className="profile-tracks-outer">
          <h2>All of {currentUser.username}'s Tracks</h2>
          {userTracks.length === 0 ? (
            <p className="no-race-message">Make a race for everyone to see!</p>
          ) : (
            <div className="profile-tracks-inner">
              {
                userTracks.map(track => (
                  <TrackBox
                    key={track._id}
                    track={track}
                  />
                ))
              }
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
