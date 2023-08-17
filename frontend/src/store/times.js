import jwtFetch from './jwt';

export const RECEIVE_TIMES = "times/RECEIVE_TIMES";
export const RECEIVE_NEW_TIME = "times/RECEIVE_NEW_TIME";
export const DELETE_TIME = "times/DELETE_TIME";
export const RECEIVE_USER_TIMES = "times/RECEIVE_USER_TIMES"
export const RECEIVE_TIME_ERRORS = "comments/RECEIVE_TIME_ERRORS";
export const CLEAR_TIME_ERRORS = "comments/CLEAR_TIME_ERRORS";

const receiveTimes = times => ({
    type: RECEIVE_TIMES,
    times
});

const receiveNewTime = time => ({
    type: RECEIVE_NEW_TIME,
    time
});

const receiveUserTimes = times => ({
  type: RECEIVE_USER_TIMES,
  times
});

const removeTime = timeId => ({
    type: DELETE_TIME,
    timeId
}); 

const receiveErrors = errors => ({
    type: RECEIVE_TIME_ERRORS,
    errors
  });
  
  export const clearTimeErrors = errors => ({
      type: CLEAR_TIME_ERRORS,
      errors
  });

export const fetchTimes = () => async dispatch => {
    try {
      const res = await jwtFetch ('/api/times');
      const times = await res.json();
      dispatch(receiveTimes(times));
    } catch (err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        dispatch(receiveErrors(resBody.errors));
      }
    }
  };

  export const composeTime = data => async dispatch => {
    try {
      const res = await jwtFetch('/api/times', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      const time = await res.json();
      dispatch(receiveNewTime(time));
    } catch(err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        return dispatch(receiveErrors(resBody.errors));
      }
    }
  };


  export const deleteTime = (timeId) => async (dispatch) => {
    const res = await jwtFetch(`/api/times/${timeId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        dispatch(removeTime(timeId));
    }
};

export const fetchUserTimes = id => async dispatch => {
  try {
    const res = await jwtFetch(`/api/times/user/${id}`);
    const times = await res.json();
    dispatch(receiveUserTimes(times));
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

const nullErrors = null;

export const timeErrorsReducer = (state = nullErrors, action) => {
    switch(action.type) {
      case RECEIVE_TIME_ERRORS:
        return action.errors;
      case RECEIVE_NEW_TIME:
      case CLEAR_TIME_ERRORS:
        return nullErrors;
      default:
        return state;
    }
  };

  const timesReducer = (state = {all: {}, user: {}}, action) => {
    let newState = state
    switch(action.type) {
        case RECEIVE_TIMES:
            return { ...newState, all: action.times}
        case RECEIVE_NEW_TIME:
          newState[action.time.id] = action.time;
        case RECEIVE_USER_TIMES:
          return { ...state, user: action.times}
          return newState;
        default:
             return state
    }
}

export default timesReducer