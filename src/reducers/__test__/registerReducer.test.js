import { REGISTER_SUCCESS, REGISTER_TRIGGER, REGISTER_FAILED } from '../../actions/types';
import registerReducer, { initialState } from '../registerReducer';

describe('register reducer tests', () => {
  it('should have an initial state', () => {
    expect(registerReducer(initialState, {})).toEqual(initialState);
  });
  it('should set isSignedUp to true upon successful signup', () => {
    expect(registerReducer(null, {
      type: REGISTER_SUCCESS,
      payload: {},
    }).isSignedUp).toEqual(true);
  });
  it('should set isSignedUp to false on unsuccessful signup', () => {
    expect(registerReducer(null, {
      type: REGISTER_FAILED,
      payload: {},
    }).isSignedUp).toEqual(false);
  });
  it('should set isLoading to true when signup begins', () => {
    expect(registerReducer(null, {
      type: REGISTER_TRIGGER,
      payload: {},
    }).isLoading).toEqual(true);
  });
});
