import objectAssign from 'object-assign';
import { GET_PROFILE_SUCCESS, UPDATE_PROFILE_SUCCESS } from '../actions/types';

export default function profileReducer(state = {}, action = {}) {
  switch (action.type) {
    case GET_PROFILE_SUCCESS: {
      // let profile = objectAssign({}, state.profile);
      const profile = action.data;
      return { ...state, profile };
    }
    case UPDATE_PROFILE_SUCCESS: {
      let profile = objectAssign({}, state.profile);
      profile = action.data;
      return { ...state, profile };
    }

    default: {
      return state;
    }
  }
}
