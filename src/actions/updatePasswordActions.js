import { toastr } from 'react-redux-toastr';
import * as types from './types';
import axiosConfig from '../config/axios';

export const updatePassword = payload => ({
  type: types.UPDATE_PASSWORD,
  payload,
});

export const updateError = payload => ({
  type: types.UPDATE_ERROR,
  payload,
});

const updatePass = (passwordObj, token) => (dispatch) => {
  dispatch({ type: types.REQUEST_UPDATE });
  axiosConfig.put(`/api/users/update_password/${token}`, passwordObj)
    .then((response) => {
      dispatch(updatePassword(response.data));
      toastr.success(response.data.message);
    })
    .catch((error) => {
      const errors = JSON.parse(error.request.response);
      dispatch(updateError(errors));
      if (errors.message !== undefined) {
        toastr.error(errors.message);
      } else if (errors.errors.password[0] !== undefined) {
        toastr.error(errors.errors.password[0]);
      }
    });
};

export default updatePass;
