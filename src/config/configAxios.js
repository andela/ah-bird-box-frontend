import axios from 'axios';

const token = localStorage.getItem('token');
const axiosConfig = axios;
if (token) {
  axios.defaults.headers.common = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}
axios.defaults.baseURL = process.env.REACT_APP_URL;

export default axiosConfig;
