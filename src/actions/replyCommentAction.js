import {
  REPLY_COMMENT_START,
  REPLY_COMMENT_SUCCESS,
  REPLY_COMMENT_FAILIURE,
} from './types';
import RetrieveCommentsApi from '../api/commentsApi';

export const replyCommentsSuccess = body => ({
  type: REPLY_COMMENT_SUCCESS,
  payload: body,
});

export const replyCommentsFailure = errors => ({
  type: REPLY_COMMENT_FAILIURE,
  payload: errors,
});

export const replyComments = () => ({
  type: REPLY_COMMENT_START,
});

export const replyComment = (articleSlug, commentId, data) => async (dispatch) => {
  dispatch(replyComments());
  await RetrieveCommentsApi.replyComment(articleSlug, commentId, data).then((response) => {
    if (response) {
      dispatch(replyCommentsSuccess(response.data));
    } else {
      dispatch(replyCommentsFailure(response));
    }
  });
};
