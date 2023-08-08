import { combineReducers } from 'redux';
import { sessionErrorsReducer } from './session';
import { trackErrorsReducer } from './tracks';

export default combineReducers({
  session: sessionErrorsReducer,
  tracks: trackErrorsReducer
});
