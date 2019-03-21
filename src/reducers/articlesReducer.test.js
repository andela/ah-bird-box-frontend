import * as types from '../actions/types';
import articlesReducer from './articlesReducer';

describe('Create article reducer', () => {
  it('should return initial state', () => {
    expect(articlesReducer(undefined, {})).toEqual({
      article: {},
      errors: {},
      isLoading: false,
      isTriggered: false,
      isSuccess: false,
      isDeleted: false,
      isFound: false,
      success: false,
    });
  });
  it('should return state after article create request', () => {
    expect(articlesReducer({}, {
      type: types.ARTICLES_CREATE_TRIGGER,
      isLoading: true,
      success: false,
    })).toEqual({
      isLoading: true,
      success: false,
    });
  });
  it('should return state after create article success', () => {
    expect(articlesReducer({}, {
      type: types.ARTICLES_CREATE_SUCCESS,
      isLoading: false,
      success: true,
    })).toEqual({
      isLoading: false,
      success: true,
    });
  });
  it('should return state after create article failure', () => {
    expect(articlesReducer({}, {
      type: types.ARTICLES_CREATE_FAILED,
      isLoading: false,
      success: false,
    })).toEqual({
      isLoading: false,
      success: false,
    });
  });
});
