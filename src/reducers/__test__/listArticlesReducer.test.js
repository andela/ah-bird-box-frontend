import * as types from '../../actions/types';
import getAllArticlesReducer from '../listArticlesReducer';

describe('Create article reducer', () => {
  it('should return initial state', () => {
    expect(getAllArticlesReducer(undefined, {})).toEqual({
      isLoading: false,
      success: false,
      articles: {},
      errors: {},
    });
  });
  it('should return state after article create request', () => {
    expect(getAllArticlesReducer({}, {
      type: types.ARTICLES_GET_ALL_TRIGGER,
      isLoading: true,
      success: false,
    })).toEqual({
      isLoading: true,
      success: false,
    });
  });
  it('should return state after create article success', () => {
    expect(getAllArticlesReducer({}, {
      type: types.ARTICLES_GET_ALL_SUCCESS,
      isLoading: false,
      success: true,
    })).toEqual({
      isLoading: false,
      success: true,
    });
  });
  it('should return state after create article failure', () => {
    expect(getAllArticlesReducer({}, {
      type: types.ARTICLES_GET_ALL_FAILED,
      isLoading: false,
      success: false,
    })).toEqual({
      isLoading: false,
      success: false,
    });
  });
});
