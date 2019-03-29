import {
  START_DELETE_COMMENT,
  DELETE_COMMENT_FAILURE,
  DELETE_COMMENT_SUCCESS,
} from './types';
import RetrieveCommentsApi from '../api/commentsApi';

export const deleteCommentsSuccess = payload => ({
  type: DELETE_COMMENT_SUCCESS,
  payload,
});

export const deleteCommentsFailure = errors => ({
  type: DELETE_COMMENT_FAILURE,
  payload: errors,
});

export const deleteComments = () => ({
  type: START_DELETE_COMMENT,
});

export const deleteComment = (slug, id) => async (dispatch) => {
  dispatch(deleteComments());
  await RetrieveCommentsApi.deleteComment(slug, id).then((response) => {
    if (response) {
      dispatch(deleteCommentsSuccess(response.data));
    } else {
      dispatch(deleteCommentsFailure(response));
    }
  });
};
