import {
  FETCH_SINGLE, SINGLE_ARTICLE_FAIL, SINGLE_ARTICLE_SUCCESS,
  START_UPDATE, UPDATE_SUCCESS,
  START_DELETE, DELETE_FAILED, DELETE_SUCCESS,
} from '../../actions/types';

import ArticlesReducer, { initialState } from '../articlesReducer';

describe('Articles Reducers tests', () => {
  it('should have an initial state', () => {
    expect(ArticlesReducer(initialState, {})).toEqual(initialState);
  });
  it('should set isFound to true upon successful fetch', () => {
    expect(ArticlesReducer(null, {
      type: SINGLE_ARTICLE_SUCCESS,
      payload: {},
    }).isFound).toEqual(true);
  });
  it('should set isSuccess to false when fetch fails', () => {
    expect(ArticlesReducer(null, {
      type: SINGLE_ARTICLE_FAIL,
      payload: {},
    }).isSuccess).toEqual(false);
  });
  it('should set isTriggered to true when fetch single begins', () => {
    expect(ArticlesReducer(null, {
      type: FETCH_SINGLE,
      payload: {},
    }).isTriggered).toEqual(true);
  });
  it('should set isLoading to true when update begins', () => {
    expect(ArticlesReducer(null, {
      type: START_UPDATE,
      payload: {},
    }).isLoading).toEqual(true);
  });
  it('should set isSuccess to true when update is successful', () => {
    expect(ArticlesReducer(null, {
      type: UPDATE_SUCCESS,
      payload: {},
    }).isSuccess).toEqual(true);
  });

  it('should set isSuccess to false when delete begins', () => {
    expect(ArticlesReducer(null, {
      type: START_DELETE,
      payload: {},
    }).isSuccess).toEqual(false);
  });
  it('should set isFound to false on successful delete', () => {
    expect(ArticlesReducer(null, {
      type: DELETE_SUCCESS,
      payload: {},
    }).isFound).toEqual(false);
  });
  it('should set isLoading to false when delete fails', () => {
    expect(ArticlesReducer(null, {
      type: DELETE_FAILED,
      payload: {},
    }).isLoading).toEqual(false);
  });
});
