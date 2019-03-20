import { REQUEST_PROFILES, REQUEST_PROFILES_SUCCESS, REQUEST_PROFILES_FAILURE } from './types';
import RetrieveUserProfilesAPI from '../api/fetchProfileApi';

export const requestUserProfilesSuccess = (payload = {}) => ({
  type: REQUEST_PROFILES_SUCCESS,
  payload,
});

export const requestUserProfilesFailure = (payload = {}) => ({
  type: REQUEST_PROFILES_FAILURE,
  payload,
});

export const requestUserProfiles = () => ({
  type: REQUEST_PROFILES,
});

export const profiles = () => async (dispatch) => {
  dispatch(requestUserProfiles());
  await RetrieveUserProfilesAPI.getUsers().then((response) => {
    if (response) {
      dispatch(requestUserProfilesSuccess(response.data.profile));
    } else {
      dispatch(requestUserProfilesFailure(response.error));
    }
  });
};
