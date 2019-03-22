/* eslint-disable consistent-return */
import { toastr } from 'react-redux-toastr';
import axiosConfig from '../config/axios';

const token = localStorage.getItem('token');

export default class followUnfollow {
  static follow(username) {
    return axiosConfig
      .post(`/api/profiles/${username}/follow/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          toastr.success(`You have successfully followed ${username}`);
          return response;
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toastr.error(`Please login to follow ${username}`);
        } else if (error.response.status === 400) {
          toastr.warning('You have already followed this user and you cannot follow yourself');
        } else if (error.response.status === 500 || error.response.status === 504) {
          toastr.info('Please try again after some time');
        } else if (error.response.status === 406) {
          toastr.error('You have alraedy followed this user and you cannot follow your self');
        }
      });
  }

  static unFollow(username) {
    return axiosConfig
      .delete(`/api/profiles/${username}/follow/`)
      .then((response) => {
        if (response.status === 200) {
          toastr.success(`You have successfully unfollowed ${username}`);
          return response;
        }
      })
      .catch((response) => {
        if (response.status === 401) {
          toastr.error('You have been logged out. Please log in and try again');
          window.location.assign('/');
        } else if (response.status === 500 || response.status === 504) {
          toastr.info('Please try again after some time');
          window.location.assign('/profiles');
        }
      });
  }
}
