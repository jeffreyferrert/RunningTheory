import jwtFetch from './jwt';
import { RECEIVE_NEW_TRACK } from './tracks.js';


export const RECEIVE_EVENT = "events/RECEIVE_EVENT";
export const DELETE_EVENT = "events/DELETE_EVENT"
export const RECEIVE_EVENT_ERRORS = "events/RECEIVE_EVENT_ERRORS";
export const CLEAR_EVENT_ERRORS = "events/CLEAR_EVENT_ERRORS";


  const receiveEvent = event => ({
    type: RECEIVE_EVENT,
    event
  });

  const removeEvent = eventId => ({
    type: DELETE_EVENT,
    eventId
  }); 
  

  const receiveErrors = errors => ({
    type: RECEIVE_EVENT_ERRORS,
    errors
  });
  
  export const clearEventErrors = errors => ({
      type: CLEAR_EVENT_ERRORS,
      errors
  });

  export const getEvent = (eventId) => state => {
    if(state.events && state.events[eventId]) {
        return state.events[eventId]
    } else {
        return null
    }
  }

  export const fetchEvent = () => async dispatch => {
    try {
      const res = await jwtFetch ('/api/events');
      const event = await res.json();
      dispatch(receiveEvent(event));
    } catch (err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        dispatch(receiveErrors(resBody.errors));
      }
    }
  };

  export const composeEvent = data => async dispatch => {
    try {
      const res = await jwtFetch('/api/events', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      const event = await res.json();
      dispatch(receiveEvent(event));
    } catch(err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        return dispatch(receiveErrors(resBody.errors));
      }
    }
  };


  
  export const deleteEvent = (eventId) => async (dispatch) => {
    const res = await jwtFetch(`/api/events/${eventId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        dispatch(removeEvent(eventId));
    }
};

  const nullErrors = null;

export const eventErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_EVENT_ERRORS:
      return action.errors;
    case RECEIVE_EVENT:
    case CLEAR_EVENT_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

export const eventReducer = (state = {all: {}}, action) => {
    let newState = state
    switch(action.type) {
        case RECEIVE_EVENT:
          newState = action.event;
          return newState;
        case DELETE_EVENT:
            delete newState[action.eventId]
            return newState;
        case RECEIVE_NEW_TRACK:
            return newState = { ...newState, ...action.tracks}
        default:
             return state
    }
}

export default eventReducer;