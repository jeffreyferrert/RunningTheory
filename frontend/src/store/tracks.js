import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';

export const RECEIVE_TRACKS = "tracks/RECEIVE_TRACKS";
export const RECEIVE_TRACK = "tracks/RECEIVE_TRACK";
export const RECEIVE_USER_TRACKS = "tracks/RECEIVE_USER_TRACKS";
export const RECEIVE_NEW_TRACK = "tracks/RECEIVE_NEW_TRACK";
export const RECEIVE_TRACK_ERRORS = "tracks/RECEIVE_TRACK_ERRORS";
export const CLEAR_TRACK_ERRORS = "tracks/CLEAR_TRACK_ERRORS";
export const DELETE_TRACK = "tracks/DELETE_TRACK"


const receiveTracks = tracks => ({
  type: RECEIVE_TRACKS,
  tracks
});

const receiveUserTracks = tracks => ({
  type: RECEIVE_USER_TRACKS,
  tracks
});

const receiveNewTrack = track => ({
  type: RECEIVE_NEW_TRACK,
  track: track
});

const removeTrack = trackId => ({
  type: DELETE_TRACK,
  trackId
});

const receiveErrors = errors => ({
  type: RECEIVE_TRACK_ERRORS,
  errors
});

export const clearTrackErrors = errors => ({
  type: CLEAR_TRACK_ERRORS,
  errors
});


export const fetchTracks = () => async dispatch => {
  try {
    const res = await jwtFetch('/api/tracks');
    const tracks = await res.json();
    dispatch(receiveTracks(tracks));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchUserTracks = id => async dispatch => {
  try {
    const res = await jwtFetch(`/api/tracks/user/${id}`);
    const tracks = await res.json();
    dispatch(receiveUserTracks(tracks));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const composeTrack = data => async dispatch => {
  try {
    const res = await jwtFetch('/api/tracks/', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    const track = await res.json();
    dispatch(receiveNewTrack(track));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const editTrack = (trackId, data) => async dispatch => {
  try {
    const res = await jwtFetch(`/api/tracks/${trackId}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
    const track = await res.json();
    dispatch(receiveNewTrack(track));
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};


export const deleteTrack = (trackId) => async (dispatch) => {
  const res = await jwtFetch(`/api/tracks/${trackId}`, {
    method: 'DELETE'
  });
  if (res.ok) {
    dispatch(removeTrack(trackId));
  }
};

const nullErrors = null;

export const trackErrorsReducer = (state = nullErrors, action) => {
  switch (action.type) {
    case RECEIVE_TRACK_ERRORS:
      return action.errors;
    case RECEIVE_NEW_TRACK:
    case CLEAR_TRACK_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const tracksReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
  switch (action.type) {
    case RECEIVE_TRACKS:
      return { ...state, all: action.tracks, new: undefined };
    case RECEIVE_USER_TRACKS:
      return { ...state, user: action.tracks, new: undefined };
    case RECEIVE_NEW_TRACK:
      return { ...state, new: action.track };
    case RECEIVE_USER_LOGOUT:
      return { ...state, user: {}, new: undefined }
    default:
      return state;
  }
};

export default tracksReducer;