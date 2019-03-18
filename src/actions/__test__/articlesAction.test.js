import {
  FETCH_SINGLE, SINGLE_ARTICLE_FAIL,
  SINGLE_ARTICLE_SUCCESS, START_UPDATE,
  UPDATE_SUCCESS, UPDATE_FAIL,
  START_DELETE, DELETE_SUCCESS,
  DELETE_FAILED,
} from '../types';

import {
  fetchSingleStart, fetchSingleFail, fetchSingleSuccess,
  startUpdate, updateFail, updateSuccess, startDelete,
  deleteFailed, deleteSuccess,
} from '../articlesAction';

describe('Test on articles', () => {
  it('should dispatch fetchSingleStart', () => {
    expect(fetchSingleStart({}).type).toEqual(FETCH_SINGLE);
  });
  it('should dispatch fetchSingleFail', () => {
    expect(fetchSingleFail({}).type).toEqual(SINGLE_ARTICLE_FAIL);
  });
  it('should dispatch fetchSingleSuccess', () => {
    expect(fetchSingleSuccess({}).type).toEqual(SINGLE_ARTICLE_SUCCESS);
  });
  it('should dispatch startUpdate', () => {
    expect(startUpdate({}).type).toEqual(START_UPDATE);
  });
  it('should dispatch updateFail', () => {
    expect(updateFail({}).type).toEqual(UPDATE_FAIL);
  });
  it('should dispatch updateSuccess', () => {
    expect(updateSuccess({}).type).toEqual(UPDATE_SUCCESS);
  });
  it('should dispatch startDelete', () => {
    expect(startDelete({}).type).toEqual(START_DELETE);
  });
  it('should dispatch deleteFailed', () => {
    expect(deleteFailed({}).type).toEqual(DELETE_FAILED);
  });
  it('should dispatch deleteSuccess', () => {
    expect(deleteSuccess({}).type).toEqual(DELETE_SUCCESS);
  });
});
