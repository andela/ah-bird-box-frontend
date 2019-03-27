import { toastr } from 'react-redux-toastr';
import axiosConfig from '../config/axios';

const token = localStorage.getItem('token');

export default class RetrieveCommentsApi {
  static getComments(slug) {
    return axiosConfig
      .get(`/api/articles/${slug}/comments/`)
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
          window.location.assign(`/articles/${slug}`);
        }
      });
  }

  static createComment(slug, data) {
    return axiosConfig
      .post(
        `/api/articles/${slug}/comments/`,
        {
          body: data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => {
        if (response.status === 201) {
          toastr.success('Comment added successfully');
          window.location.assign(`/articles/${slug}`);
          return {
            content: response.data,
          };
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toastr.error(error.response.data.errors.body);
          return {
            content: error.response,
          };
        }
        if (error.response.status === 401) {
          toastr.error('You have been logged out. Please log in and try again');
          window.location.assign('/login');
          return {
            content: error.response,
          };
        }
        if (error.response.status === 403) {
          toastr.error(error.response.data.detail);
          window.location.assign('/login');
          return {
            content: error.response,
          };
        }
      });
  }

  static editComments(slug, id, data) {
    return axiosConfig
      .put(
        `/api/articles/${slug}/comments/${id}/`,
        {
          body: data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => {
        if (response.status === 200) {
          toastr.success('Comment updated successfully');
          window.location.assign(`/articles/${slug}`);
          return {
            content: response.data,
          };
        }
      })

      .catch((error) => {
        if (error.response.status === 403) {
          toastr.error(error.response.data.detail);
          window.location.assign('/login');
          return {
            content: error.response,
          };
        }
        if (error.response.status === 500 && !data) {
          toastr.error('Comment body can not be empty');
          return {
            content: error.response,
          };
        }
      });
  }

  static deleteComment({ articleSlug, commentId }) {
    return axiosConfig
      .delete(`/api/articles/${articleSlug}/comments/${commentId}/`)
      .then((response) => {
        if (response.status === 200) {
          toastr.success('Comment deleted successfully');
          window.location.assign(`/articles/${articleSlug}`);
          return response;
        }
      })
      .catch((response) => {
        if (response.status === 401) {
          toastr.error('You have been logged out. Please log in and try again');
          window.location.assign('/');
        } else if (response.response.status === 500 || response.response.status === 504) {
          toastr.info('Please try again after some time');
          window.location.assign(`/articles/${articleSlug}`);
        }
      });
  }

  static replyComment(articleSlug, commentId, data) {
    return axiosConfig
      .post(`/api/articles/${articleSlug}/comments/${commentId}/`,
        {
          ...data,
        })
      .then((response) => {
        if (response.status === 201) {
          toastr.success('reply sent successfully');
          window.location.assign(`/articles/${articleSlug}`);
          return response;
        }
      })
      .catch((response) => {
        if (response.status === 401) {
          toastr.error('You have been logged out. Please log in and try again');
          window.location.assign('/');
        } else if (response.response.status === 500 || response.response.status === 504) {
          toastr.info('Please try again after some time');
          window.location.assign(`/articles/${articleSlug}`);
        }
      });
  }
}
