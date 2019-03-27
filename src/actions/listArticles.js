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

export const getArticles = (page = 1) => (dispatch) => {
  dispatch(articlesGetAllTrigger());
  axiosConfig
    .get(`/api/articles/?page=${page}`, page)
    .then((response) => {
      dispatch(articlesGetAllSuccess(response.data));
    })
    .catch((error) => {
      dispatch(articlesGetAllFail(error));
    });
};
