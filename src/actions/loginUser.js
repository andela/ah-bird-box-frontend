import { toastr } from 'react-redux-toastr';
import { LOGIN_USER, LOGIN_ERROR, LOGIN_REQUEST } from './types';
import axiosConfig from '../config/configAxios';

const loginUser = credentials => (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  });
  delete axiosConfig.defaults.headers.common.Authorization;
  localStorage.clear();
  axiosConfig
    .post('/users/login/', credentials)
    .then((res) => {
      if (res) {
        dispatch({
          type: LOGIN_USER,
          payload: { ...res.data.user, success: true },
        });
        toastr.success(
          'Successful Login',
          `${res.data.user.username} logged in successfully`,
        );
      }
    })
    .catch((errors) => {
      const err = JSON.parse(errors.request.response);
      dispatch({
        type: LOGIN_ERROR,
        payload: err.errors,
      });
      const message = err.errors.error[0];
      toastr.error('Login Failed', message);
    });
};

export default loginUser;
