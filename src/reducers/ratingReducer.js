import { ARTICLES_RATING_TRIGGER, ARTICLES_RATING_FAILED, ARTICLES_RATING_SUCCESS } from '../actions/types';

const initialState = {
  article: {},
  errors: {},
  isLoading: false,
  success: false,
};
const rateArticlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ARTICLES_RATING_TRIGGER:
      return {
        ...state,
        isLoading: true,
        success: false,
      };
    case ARTICLES_RATING_SUCCESS:
      return {
        ...state,
        article: action.payload,
        success: true,
        isLoading: false,
      };
    case ARTICLES_RATING_FAILED:
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

export default rateArticlesReducer;
