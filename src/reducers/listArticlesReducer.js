import { ARTICLES_GET_ALL_TRIGGER, ARTICLES_GET_ALL_FAILED, ARTICLES_GET_ALL_SUCCESS } from '../actions/types';

const initialState = {
  articles: {},
  errors: {},
  isLoading: false,
  success: false,
};
const getAllArticlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ARTICLES_GET_ALL_TRIGGER:
      return {
        ...state,
        isLoading: true,
        success: false,
      };
    case ARTICLES_GET_ALL_SUCCESS:
      return {
        ...state,
        articles: action.payload,
        success: true,
        isLoading: false,
      };
    case ARTICLES_GET_ALL_FAILED:
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

export default getAllArticlesReducer;
