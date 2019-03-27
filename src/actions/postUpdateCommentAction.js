import {
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT,
  START_EDIT,
  EDIT_SUCCESS,
  EDIT_FAILURE,
} from './types';
import RetrieveCommentsApi from '../api/commentsApi';

export const createCommentsSuccess = body => ({
  type: CREATE_COMMENT_SUCCESS,
  payload: body,
});

export const createCommentsFailure = errors => ({
  type: CREATE_COMMENT_FAILURE,
  payload: errors,
});

export const createComments = () => ({
  type: CREATE_COMMENT,
});

export const editCommentSuccess = body => ({
  type: EDIT_SUCCESS,
  payload: body,
});

export const editCommentFailure = errors => ({
  type: EDIT_FAILURE,
  payload: errors,
});

export const editComment = () => ({
  type: START_EDIT,
});

export const createComment = (slug, data) => async (dispatch) => {
  dispatch(createComments());
  await RetrieveCommentsApi.createComment(slug, data).then((response) => {
    if (response) {
      dispatch(createCommentsSuccess(response.data));
    } else {
      dispatch(createCommentsFailure(response));
    }
  });
};

export const updateComment = (slug, id, data) => async (dispatch) => {
  const { body } = data;
  const updateinfo = body.body;
  dispatch(editComment());
  await RetrieveCommentsApi.editComments(slug, id, updateinfo).then((response) => {
    if (response) {
      dispatch(editCommentSuccess(response.data));
    } else {
      dispatch(editCommentFailure(response));
    }
  });
};
