import {
  FETCH_SINGLE, SINGLE_ARTICLE_FAIL, SINGLE_ARTICLE_SUCCESS,
  START_UPDATE, UPDATE_SUCCESS, UPDATE_FAIL,
  START_DELETE, DELETE_FAILED, DELETE_SUCCESS,
} from '../actions/types';

export const initialState = {
  isLoading: false,
  isTriggered: false,
  isSuccess: false,
  isDeleted: false,
  isFound: false,
};

const ArticlesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_SINGLE:
      return {
        ...state,
        isLoading: true,
        isTriggered: true,
      };

    case SINGLE_ARTICLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        articles: payload,
        isSuccess: true,
        isFound: true,
        isDeleted: false,
      };

    case SINGLE_ARTICLE_FAIL:
      return {
        ...state,
        isLoading: false,
        errors: payload,
        isSuccess: false,
        isFound: false,
        isDeleted: true,
      };

    case START_UPDATE:
      return {
        ...state,
        isLoading: true,
      };

    case UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        articles: payload,
        isSuccess: true,
        isUpdated: true,
      };

    case UPDATE_FAIL:
      return {
        ...state,
        isLoading: false,
        errors: payload,
        isSuccess: false,
      };

    case START_DELETE:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };

    case DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isDeleted: true,
        isFound: false,
      };

    case DELETE_FAILED:
      return {
        ...state,
        isLoading: false,
        errors: payload,
        isSuccess: true,
      };

    default:
      return state;
  }
};

export default ArticlesReducer;
