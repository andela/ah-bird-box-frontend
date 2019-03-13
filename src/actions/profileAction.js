/* eslint-disable no-unused-vars */
import { types } from 'util';
import { GET_PROFILE_SUCCESS, UPDATE_PROFILE_SUCCESS } from './types';
import profileApi from '../api/profileApi';

export const getprofileSuccess = data => ({
  type: GET_PROFILE_SUCCESS,
  data,
});

export const updateprofileSuccess = data => ({
  type: UPDATE_PROFILE_SUCCESS,
  data,
});

export const getProfile = username => async (dispatch) => {
  await profileApi.profile(username).then((response) => {
    if (response.content) {
      dispatch(getprofileSuccess(response.content.profile));
    }
  });
};

export const updateProfile = (username, data) => (dispatch) => {
  profileApi.updateProfile(username, data).then((response) => {
    if (response.content) {
      dispatch(updateprofileSuccess(response.content.profile));
    }
  });
};
