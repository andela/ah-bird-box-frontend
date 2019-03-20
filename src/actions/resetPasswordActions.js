import { toastr } from 'react-redux-toastr';
import * as types from './types';
import axiosConfig from '../config/axios';

export const provideEmail = payload => ({
  type: types.PROVIDE_EMAIL,
  payload,
});

export const requestEmail = payload => ({
  type: types.REQUEST_EMAIL,
  payload,
});

export const emailError = payload => ({
  type: types.EMAIL_ERROR,
  payload,
});

const addEmail = email => (dispatch) => {
  dispatch({ type: types.REQUEST_EMAIL });
  axiosConfig.post('/api/users/reset_password/', email)
    .then((response) => {
      dispatch(provideEmail(response.data.user));
      toastr.success(response.data.user.message);
    })
    .catch((error) => {
      const errors = JSON.parse(error.request.response);
      dispatch(emailError(errors));
      if (errors.user.message !== undefined) {
        toastr.error(errors.user.message);
      } else if (errors.errors.message !== undefined) {
        toastr.error(errors.errors.message);
      }
    });
};

export default addEmail;
