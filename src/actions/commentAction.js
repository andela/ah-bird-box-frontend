import { GET_COMMENTS, GET_COMMENTS_FAILURE, GET_COMMENTS_SUCCESS } from './types';
import RetrieveCommentsApi from '../api/commentsApi';

export const requestGetComments = comments => ({
  type: GET_COMMENTS,
  payload: comments,
});

export const requestGetCommentsSuccess = payload => ({
  type: GET_COMMENTS_SUCCESS,
  payload,
});

export const requestGetCommentsFailure = errors => ({
  type: GET_COMMENTS_FAILURE,
  payload: errors,
});

export const fetchComments = slug => async (dispatch) => {
  dispatch(requestGetComments());
  await RetrieveCommentsApi.getComments(slug).then((response) => {
    if (response) {
      dispatch(requestGetCommentsSuccess(response.data));
    } else {
      dispatch(requestGetCommentsFailure(response.error));
    }
  });
};
