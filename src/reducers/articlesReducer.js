import {
  FETCH_SINGLE, SINGLE_ARTICLE_FAIL, SINGLE_ARTICLE_SUCCESS,
  START_UPDATE, UPDATE_SUCCESS, UPDATE_FAIL,
  START_DELETE, DELETE_FAILED, DELETE_SUCCESS,
  ARTICLES_CREATE_SUCCESS, ARTICLES_CREATE_FAILED,
  ARTICLES_CREATE_TRIGGER,
} from '../actions/types';

export const initialState = {
  article: {},
  errors: {},
  isLoading: false,
  isTriggered: false,
  isSuccess: false,
  isDeleted: false,
  isFound: false,
  success: false,
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

    case ARTICLES_CREATE_TRIGGER:
      return {
        ...state,
        isLoading: true,
        success: false,
      };
    case ARTICLES_CREATE_SUCCESS:
      return {
        ...state,
        article: action.payload,
        success: true,
        isLoading: false,
      };
    case ARTICLES_CREATE_FAILED:
      return {
        ...state,
        errors: action.payload,
        success: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default ArticlesReducer;
