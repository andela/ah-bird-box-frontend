import { PROVIDE_EMAIL, EMAIL_ERROR } from '../actions/types';

import resetPasswordReducer, { initialState } from './resetPasswordReducer';

describe('resetPasswordReducer tests', () => {
  it('should have an initial state', () => {
    expect(resetPasswordReducer(initialState, {})).toEqual({
      isSent: false, isUpdated: false, message: {}, errors: {},
    });
  });
  it('should show isSent to true when on reset password submit', () => {
    expect(resetPasswordReducer(null, {
      type: PROVIDE_EMAIL,
      payload: {},
    }).isSent).toEqual(true);
  });
  it('should show isSent to false when reset password has an error(s)', () => {
    expect(resetPasswordReducer(null, {
      type: EMAIL_ERROR,
      payload: {},
    }).isSent).toEqual(false);
  });
});
