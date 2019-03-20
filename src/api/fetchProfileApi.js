import toastr from 'react-redux-toastr';
import axiosConfig from '../config/axios';

export default class RetrieveUserProfilesAPI {
  static getUsers() {
    return axiosConfig
      .get('/api/profiles/?limit=123456789')
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
      })
      .catch((response) => {
        if (response.status === 401) {
          toastr.error('You have been logged out. Please log in and try again');
          window.location.assign('/');
        } else if (response.response.status === 500 || response.response.status === 504) {
          toastr.info('Please try again after some time');
          window.location.assign('/profile');
        }
      });
  }

  static retrieveSpecificProfile(username) {
    return axiosConfig.get(`/api/profiles/${username}`).then((response) => {
      if (response.status === 200) {
        return response;
      }
    });
  }

  static retrieveUserFollowers(username) {
    return axiosConfig
      .get(`/api/profiles/${username}/following/`)
      .then((response) => {
        if (response.status === 200) {
          return { data: response.data };
        }
      })
      .catch((response) => {
        if (response.response.status === 401) {
          toastr.error('You have been logged out. Please log in and try again');
          window.location.assign('/login');
        } else if (response.response.status === 500 || response.response.status === 504) {
          toastr.info('Please try again after some time');
          window.location.assign('/login');
        }
      });
  }
}
