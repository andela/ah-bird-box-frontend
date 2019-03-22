import { ARTICLES_GET_ALL_TRIGGER, ARTICLES_GET_ALL_FAILED, ARTICLES_GET_ALL_SUCCESS } from './types';
import axiosConfig from '../config/axios';

export const articlesGetAllSuccess = payload => ({
  type: ARTICLES_GET_ALL_SUCCESS,
  payload,
});

export const articlesGetAllFail = payload => ({
  type: ARTICLES_GET_ALL_FAILED,
  payload,
});

export const articlesGetAllTrigger = () => ({
  type: ARTICLES_GET_ALL_TRIGGER,
});

export const getArticles = () => (dispatch) => {
  dispatch(articlesGetAllTrigger());
  axiosConfig
    .get('/api/articles/')
    .then((response) => {
      dispatch(articlesGetAllSuccess(response.data));
    })
    .catch((error) => {
      dispatch(articlesGetAllFail(error));
    });
};
