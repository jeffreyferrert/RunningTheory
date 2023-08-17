import { combineReducers } from 'redux';
import { sessionErrorsReducer } from './session';
import { trackErrorsReducer } from './tracks';
import { eventErrorsReducer } from './event';
import { timeErrorsReducer } from './times';

export default combineReducers({
  session: sessionErrorsReducer,
  tracks: trackErrorsReducer,
  events: eventErrorsReducer,
  times: timeErrorsReducer
});
