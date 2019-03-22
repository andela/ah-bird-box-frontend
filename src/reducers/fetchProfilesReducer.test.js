import fetchProfilesReducer from './fetchProfilesReducer';
import {
  REQUEST_PROFILES,
  REQUEST_PROFILES_SUCCESS,
  REQUEST_PROFILES_FAILURE,
} from '../actions/types';

describe('profile reducer', () => {
  it('should handle profile view success', () => {
    const state = {};

    const userData = {
      type: REQUEST_PROFILES_SUCCESS,
    };

    const expectedData = { };
    expect(fetchProfilesReducer(state, userData)).toEqual(expectedData);
  });

  it('should handle profile update failure', () => {
    const state = {};

    const userData = {
      type: REQUEST_PROFILES_FAILURE,
    };

    const expectedData = {
      profiles: {
        error: undefined,
        state: 'error',

      },
    };
    expect(fetchProfilesReducer(state, userData)).toEqual(expectedData);
  });

  it('should handle profile update request', () => {
    const state = {};

    const userData = {
      type: REQUEST_PROFILES,
    };

    const expectedData = { profiles: {} };
    expect(fetchProfilesReducer(state, userData)).toEqual(expectedData);
  });
});
