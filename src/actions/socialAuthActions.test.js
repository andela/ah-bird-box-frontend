import { LOGIN_START, LOGIN_SUCCESS, SOCIAL_LOGIN_ERROR } from './types';
import { loginError, loginSuccess, loginStart } from './socialAuthActions';

describe('social auth login action creator', () => {
  it('should dispatch LOGIN_START', () => {
    expect(loginStart({}).type).toEqual(LOGIN_START);
  });
  it('should dispatch LOGIN_SUCCESS', () => {
    expect(loginSuccess({}).type).toEqual(LOGIN_SUCCESS);
  });
  it('should dispatch SOCIAL_LOGIN_ERROR', () => {
    expect(loginError({}).type).toEqual(SOCIAL_LOGIN_ERROR);
  });
});
