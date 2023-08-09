import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserTracks, clearTrackErrors } from '../../store/tracks';
import { fetchUserTimes, clearTimeErrors } from "../../store/times";
import TrackBox from '../Tracks/TrackBox';
import Time from '../TrackShowPage/Time'

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

  if (userTracks.length === 0) {
    return <div>{currentUser.username} has no Tracks</div>;
  } else {
    return (
      <>
        <div className="profile-tracks">
          <h2>All of {currentUser.username}'s Tracks</h2>
          {userTracks.map(track => (
            <TrackBox
              key={track._id}
              track={track}
            />
          ))}
        </div>
        <div className="profile-times">
          <h2>All of {currentUser.username}'s Times</h2>
          {userTimes && (userTimes.map((time, index) => (
            <li className={index}>
              <Time key={index} time={time} currUser={currentUser} />

            </li>
          )))
          }
        </div>
      </>
    );
  }
}

export default Profile;
