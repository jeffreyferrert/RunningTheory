import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';

const RECEIVE_COMMENTS = "comments/RECEIVE_COMMENTS";
const RECEIVE_NEW_COMMENT = "comments/RECEIVE_NEW_COMMENT";
const DELETE_COMMENT = "comments/DELETE_COMMENT"
const RECEIVE_COMMENT_ERRORS = "comments/RECEIVE_COMMENT_ERRORS";
const CLEAR_COMMENT_ERRORS = "comments/CLEAR_COMMENT_ERRORS";

const receiveComments = comments => ({
    type: RECEIVE_COMMENTS,
    comments
  });
  
  const receiveNewComment = comment => ({
    type: RECEIVE_NEW_COMMENT,
    comment
  });

  const deleteComment = commentId => ({
    type: DELETE_COMMENT,
    commentId
  }); 
  
  const receiveErrors = errors => ({
    type: RECEIVE_COMMENT_ERRORS,
    errors
  });
  
  export const clearTrackErrors = errors => ({
      type: CLEAR_COMMENT_ERRORS,
      errors
  });

  export const fetchComments = () => async dispatch => {
    try {
      const res = await jwtFetch ('/api/comments');
      const comments = await res.json();
      dispatch(receiveComments(comments));
    } catch (err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        dispatch(receiveErrors(resBody.errors));
      }
    }
  };

  export const composeComment = data => async dispatch => {
    try {
      const res = await jwtFetch('/api/comments/', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      const comment = await res.json();
      dispatch(receiveNewComment(comment));
    } catch(err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        return dispatch(receiveErrors(resBody.errors));
      }
    }
  };

  const nullErrors = null;

export const commentErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_COMMENT_ERRORS:
      return action.errors;
    case RECEIVE_NEW_COMMENT:
    case CLEAR_COMMENT_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const commentsReducer = (state = {all: {}, user: {}, track: {}}, action) => {
    let newState = state
    switch(action.type) {
        case RECEIVE_COMMENTS:
            return { ...newState, all: action.comments}
        case RECEIVE_NEW_COMMENT:
            return { ...newState, [action.comments.id]: action.comment }
        default:
             return state
    }
}

export default commentsReducer