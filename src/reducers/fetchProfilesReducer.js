import objectAssign from 'object-assign';
import {
  REQUEST_PROFILES,
  REQUEST_PROFILES_SUCCESS,
  REQUEST_PROFILES_FAILURE,
} from '../actions/types';

export default function fetchProfilesReducer(state = {}, action) {
  switch (action.type) {
    case REQUEST_PROFILES_SUCCESS: {
      const profiles = objectAssign({}, state.profiles);
      profiles.users = action.payload;
      return profiles;
    }
    case REQUEST_PROFILES_FAILURE: {
      const profiles = objectAssign({}, state.profiles);
      profiles.state = 'error';
      profiles.error = action.payload;
      return { ...state, profiles };
    }
    case REQUEST_PROFILES: {
      const profiles = objectAssign({}, state.profiles);
      return { ...state, profiles };
    }
    default:
      return state;
  }
}
