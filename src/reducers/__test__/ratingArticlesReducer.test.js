import * as types from '../../actions/types';
import rateArticlesReducer from '../ratingReducer';

describe('Rate article reducer', () => {
  it('should return initial state', () => {
    expect(rateArticlesReducer(undefined, {})).toEqual({
      isLoading: false,
      success: false,
      article: {},
      errors: {},
    });
  });
  it('should return state after article create request', () => {
    expect(rateArticlesReducer({}, {
      type: types.ARTICLES_RATING_TRIGGER,
      isLoading: true,
      success: false,
    })).toEqual({
      isLoading: true,
      success: false,
    });
  });
  it('should return state after create article success', () => {
    expect(rateArticlesReducer({}, {
      type: types.ARTICLES_RATING_SUCCESS,
      isLoading: false,
      success: true,
    })).toEqual({
      isLoading: false,
      success: true,
    });
  });
  it('should return state after create article failure', () => {
    expect(rateArticlesReducer({}, {
      type: types.ARTICLES_RATING_FAILED,
      isLoading: false,
      success: false,
    })).toEqual({
      isLoading: false,
      success: false,
    });
  });
});
