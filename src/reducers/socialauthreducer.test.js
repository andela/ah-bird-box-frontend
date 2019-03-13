import { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR } from '../actions/types';
import SocialAuthReducer, { initialState } from './socialauthreducer';

describe('reducer tests for login with social options', () => {
  it('the reducer should have an initial state', () => {
    expect(SocialAuthReducer(initialState, {})).toEqual(initialState);
  });
  it('the reducer should show is loading state upon login submit request', () => {
    expect(SocialAuthReducer(null, {
      type: LOGIN_START,
      payload: {},
    }).isLoading).toEqual(true);
  });
  it('the reducer should set error to true when there is a login error', () => {
    expect(SocialAuthReducer(null, {
      type: LOGIN_ERROR,
      payload: {},
    }).error).toEqual(true);
  });
  it('the reducer should set message to success when there is a successful login', () => {
    expect(SocialAuthReducer(null, {
      type: LOGIN_SUCCESS,
      payload: {},
    }).message).toEqual('success');
  });
});
