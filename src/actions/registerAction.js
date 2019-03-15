import { toastr } from 'react-redux-toastr';
import { REGISTER_SUCCESS, REGISTER_FAILED, REGISTER_TRIGGER } from './types';
import axiosConfig from '../config/axios';

export const registerSuccess = payload => ({
  type: REGISTER_SUCCESS,
  payload,
});

export const registerFail = payload => ({
  type: REGISTER_FAILED,
  payload,
});

export const registerTrigger = () => ({
  type: REGISTER_TRIGGER,
});

export const signUpUser = userData => (dispatch) => {
  dispatch(registerTrigger());
  axiosConfig
    .post('/api/users/', userData)
    .then((response) => {
      dispatch(registerSuccess(response.data));

      toastr.success('Sign Up successful!', response.data.user.message);
    })
    .catch((error) => {
      console.log(error.response);
      dispatch(registerFail(error.response.data));
      if (error.response.data.errors.email !== undefined) {
        toastr.error('Email', error.response.data.errors.email[0]);
      } else if (error.response.data.errors.username !== undefined) {
        toastr.error('Username', error.response.data.errors.username[0]);
      } else if (error.response.data.errors.password !== undefined) {
        toastr.error('Password', error.response.data.errors.password[0]);
      }
    });
};
