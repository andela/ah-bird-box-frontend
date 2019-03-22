import objectAssign from 'object-assign';
import { GET_PROFILE_SUCCESS } from '../actions/types';

export default function specificProfileReducer(state = {}, action) {
  switch (action.type) {
    case GET_PROFILE_SUCCESS: {
      let searchedProfile = objectAssign({}, state.searchedProfile);
      searchedProfile = action.data;
      return { ...state, searchedProfile };
    }
    default: {
      return state;
    }
  }
}
