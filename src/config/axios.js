import axios from 'axios';

const token = localStorage.getItem('token');
const axiosConfig = axios;
if (token) {
  axiosConfig.defaults.headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
export default axiosConfig;
