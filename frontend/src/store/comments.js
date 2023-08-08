import jwtFetch from './jwt';
import { RECEIVE_NEW_TRACK } from './tracks.js';

export const RECEIVE_COMMENTS = "comments/RECEIVE_COMMENTS";
export const RECEIVE_NEW_COMMENT = "comments/RECEIVE_NEW_COMMENT";
export const DELETE_COMMENT = "comments/DELETE_COMMENT"
export const RECEIVE_COMMENT_ERRORS = "comments/RECEIVE_COMMENT_ERRORS";
export const CLEAR_COMMENT_ERRORS = "comments/CLEAR_COMMENT_ERRORS";

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

  export const getComment = (commentId) => state => {
    if(state.comments && state.comments[commentId]) {
        return state.comments[commentId]
    } else {
        return null
    }
  }

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
      const res = await jwtFetch('/api/comments', {
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

const commentsReducer = (state = {all: {}}, action) => {
    let newState = state
    switch(action.type) {
        case RECEIVE_COMMENTS:
            return { ...newState, all: action.comments}
        case RECEIVE_NEW_COMMENT:
          newState[action.comment.id] = action.comment;
          return newState;
        case RECEIVE_NEW_TRACK:
            newState = { ...newState, ...action.tracks}
        default:
             return state
    }
}

export default commentsReducer