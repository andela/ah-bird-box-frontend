import { toastr } from 'react-redux-toastr';
import { VERIFY_SUCCESS, VERIFY_FAIL, VERIFY_TRIGGER } from './types';
import axiosConfig from '../config/axios';

const verifySuccess = payload => ({
  type: VERIFY_SUCCESS,
  payload,
});

const verifyFail = payload => ({
  type: VERIFY_FAIL,
  payload,
});

const verifyTrigger = () => ({
  type: VERIFY_TRIGGER,
});

const verifyEmail = token => (dispatch) => {
  dispatch(verifyTrigger());
  axiosConfig
    .get(`/api/users/verify/${token}`)
    .then((response) => {
      dispatch(verifySuccess(response.data));
      toastr.success('You can now login', response.data.message);
    })
    .catch((error) => {
      dispatch(verifyFail(error.response.data));
      toastr.error('Email verification failed', 'Request for another verification link');
    });
};

export default verifyEmail;
