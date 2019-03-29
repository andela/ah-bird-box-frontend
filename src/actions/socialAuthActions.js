import * as types from './types';
import axiosConfig from '../config/axios';

export const FacebookAuth = data => ({
  data,
});

export const GoogleAuth = data => ({
  data,
});

export const loginStart = payload => ({
  type: types.LOGIN_START,
  payload,
});

export const loginSuccess = payload => ({
  type: types.LOGIN_SUCCESS,
  payload,
});
export const loginError = payload => ({
  type: types.SOCIAL_LOGIN_ERROR,
  payload,
});

export const socialAuthLogin = payload => (dispatch) => {
  const { authData } = payload;
  delete axiosConfig.defaults.headers;
  axiosConfig
    .post('/api/social/login/', authData)
    .then((response) => {
      dispatch(loginSuccess(response.data));
      localStorage.setItem('token', response.data.user.token);
      localStorage.setItem('username', response.data.user.username);
      localStorage.setItem('id', response.data.user.id);
    })
    .catch((error) => {
      dispatch(loginError(error.response.data));
    });
};
