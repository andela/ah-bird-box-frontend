import { ARTICLES_RATING_TRIGGER, ARTICLES_RATING_FAILED, ARTICLES_RATING_SUCCESS } from './types';
import axiosConfig from '../config/axios';
import { fetchSingleSuccess, fetchSingleFail } from '../actions/articlesAction';
import { toastr } from 'react-redux-toastr';

export const articlesRatingSuccess = payload => ({
  type: ARTICLES_RATING_SUCCESS,
  payload,
});

export const articlesRatingFail = payload => ({
  type: ARTICLES_RATING_FAILED,
  payload,
});

export const articlesRatingTrigger = () => ({
  type: ARTICLES_RATING_TRIGGER,
});

export const rateArticles = (ratingData, slug) => (dispatch) => {
  dispatch(articlesRatingTrigger());
  axiosConfig
    .post(`/api/articles/${slug}/ratings/`, {stars: ratingData})
    .then((response) => {
      dispatch(articlesRatingSuccess(response.data));
      axiosConfig
      .get(`/api/articles/${slug}`)
      .then((response) => {
        dispatch(fetchSingleSuccess(response.data.article));
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchSingleFail(error.response.data.article.errors.error));
        toastr.error('Article not found', error.response.data.article.errors.error);
      });
    })
    .catch((error) => {
      dispatch(articlesRatingFail(error));
    });
};
