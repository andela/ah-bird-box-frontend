import { toastr } from 'react-redux-toastr';
import {
  FETCH_SINGLE, SINGLE_ARTICLE_FAIL,
  SINGLE_ARTICLE_SUCCESS, START_UPDATE,
  UPDATE_SUCCESS, UPDATE_FAIL,
  START_DELETE, DELETE_SUCCESS,
  DELETE_FAILED,
} from './types';
import axiosConfig from '../config/axios';

export const fetchSingleStart = () => ({
  type: FETCH_SINGLE,
});

export const fetchSingleFail = payload => ({
  type: SINGLE_ARTICLE_FAIL,
  payload,
});

export const fetchSingleSuccess = payload => ({
  type: SINGLE_ARTICLE_SUCCESS,
  payload,
});

export const startUpdate = () => ({
  type: START_UPDATE,
});

export const updateFail = payload => ({
  type: UPDATE_FAIL,
  payload,
});

export const updateSuccess = payload => ({
  type: UPDATE_SUCCESS,
  payload,
});

export const startDelete = () => ({
  type: START_DELETE,
});

export const deleteFailed = payload => ({
  type: DELETE_FAILED,
  payload,
});

export const deleteSuccess = payload => ({
  type: DELETE_SUCCESS,
  payload,
});

const fetchSingleArticle = slug => (dispatch) => {
  dispatch(fetchSingleStart());

  axiosConfig
    .get(`/api/articles/${slug}`)
    .then((response) => {
      dispatch(fetchSingleSuccess(response.data));
    })
    .catch((error) => {
      dispatch(fetchSingleFail(error.response.data.article.errors.error));
      toastr.error('Article not found', error.response.data.article.errors.error);
    });
};

export const updateArticle = (updatedData, slug) => (dispatch) => {
  dispatch(startUpdate());

  axiosConfig
    .put(`/api/articles/${slug}/`, updatedData)
    .then((response) => {
      dispatch(updateSuccess(response.data));
      toastr.success('Update Successful');
    })
    .catch((error) => {
      dispatch(updateFail(error.response));
      toastr.error('Update Failed', error.response.data.message.detail);
    });
};

export const deleteArticle = slug => (dispatch) => {
  dispatch(startDelete());
  axiosConfig
    .delete(`/api/articles/${slug}/`)
    .then((response) => {
      dispatch(deleteSuccess(response.data));
      toastr.success('Article Deleted Successfully');
    })
    .catch((error) => {
      dispatch(deleteFailed(error.response));
      toastr.error(error.response.data.article.errors.error);
    });
};

export default fetchSingleArticle;
