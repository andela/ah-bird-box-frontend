import getCommentstReducer, { initialState } from '../commentReducer';
import {
  GET_COMMENTS_SUCCESS,
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_SUCCESS,
  EDIT_SUCCESS,
  EDIT_FAILURE,
  DELETE_COMMENT_FAILURE,
  DELETE_COMMENT_SUCCESS,
  REPLY_COMMENT_SUCCESS,
  REPLY_COMMENT_FAILIURE,
} from '../../actions/types';

describe('comment reducer', () => {
  it('should have an initial state', () => {
    expect(getCommentstReducer(initialState, {})).toEqual({
      comments: [],
      isFetched: false,
      isCreated: false,
      creating: false,
      isEdited: false,
      isDeleted: false,
      editing: false,
      isReplied: false,
      replying: false,
    });
  });
  it('should handle comments view success', () => {
    const state = {};
    const userData = {
      type: GET_COMMENTS_SUCCESS,
      isFetched: true,
    };

    const expectedData = { comments: undefined, isFetched: true };
    expect(getCommentstReducer(state, userData)).toEqual(expectedData);
  });

  it('should handle comments create success', () => {
    const state = {};
    const userData = {
      type: CREATE_COMMENT_SUCCESS,
      isCreated: true,
    };

    const expectedData = { comment: undefined, isCreated: true };
    expect(getCommentstReducer(state, userData)).toEqual(expectedData);
  });

  it('should handle comments update success', () => {
    const state = {};
    const userData = {
      type: EDIT_SUCCESS,
      isEdited: true,
      editing: false,
    };

    const expectedData = { comment: undefined, editing: false, isEdited: true };
    expect(getCommentstReducer(state, userData)).toEqual(expectedData);
  });

  it('should handle comments delete success', () => {
    const state = {};
    const userData = {
      type: DELETE_COMMENT_SUCCESS,
      isDeleted: true,
    };

    const expectedData = { delete: undefined, isDeleted: true };
    expect(getCommentstReducer(state, userData)).toEqual(expectedData);
  });

  it('should handle comments reply success', () => {
    const state = {};
    const userData = {
      type: REPLY_COMMENT_SUCCESS,
      isReplied: true,
    };

    const expectedData = { comment: undefined, isReplied: false, replying: false };
    expect(getCommentstReducer(state, userData)).toEqual(expectedData);
  });

  it('should handle coments create failure', () => {
    const state = {};

    const userData = {
      type: CREATE_COMMENT_FAILURE,
      isCreated: false,
    };

    const expectedData = { errors: undefined, isCreated: false };
    expect(getCommentstReducer(state, userData)).toEqual(expectedData);
  });

  it('should handle coments reply failure', () => {
    const state = {};

    const userData = {
      type: REPLY_COMMENT_FAILIURE,
      isReplied: false,
      replying: false,
    };

    const expectedData = { errors: undefined, isReplied: false, replying: false };
    expect(getCommentstReducer(state, userData)).toEqual(expectedData);
  });

  it('should handle coments update failure', () => {
    const state = {};

    const userData = {
      type: EDIT_FAILURE,
      isEdited: false,
      editing: false,
    };

    const expectedData = { editing: false, errors: undefined, isEdited: false };
    expect(getCommentstReducer(state, userData)).toEqual(expectedData);
  });

  it('should handle coments update failure', () => {
    const state = {};

    const userData = {
      type: DELETE_COMMENT_FAILURE,
      isDeleted: false,
    };

    const expectedData = { errors: undefined, isDeleted: false };
    expect(getCommentstReducer(state, userData)).toEqual(expectedData);
  });
});
