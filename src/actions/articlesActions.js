import { toastr } from 'react-redux-toastr';
import { ARTICLES_CREATE_SUCCESS, ARTICLES_CREATE_FAILED, ARTICLES_CREATE_TRIGGER } from './types';
import axiosConfig from '../config/axios';

export const articleCreationSuccess = payload => ({
  type: ARTICLES_CREATE_SUCCESS,
  payload,
});

export const articleCreationFail = payload => ({
  type: ARTICLES_CREATE_FAILED,
  payload,
});

export const articleCreationTrigger = () => ({
  type: ARTICLES_CREATE_TRIGGER,
});

export const createArticle = articleData => (dispatch) => {
  dispatch(articleCreationTrigger());
  axiosConfig
    .post('/api/articles/', articleData)
    .then((response) => {
      dispatch(articleCreationSuccess(response.data));

      toastr.success('Article created successful!', response.data.article.title);
    })
    .catch((error) => {
      dispatch(articleCreationFail(error.response.data.error));
    });
};
