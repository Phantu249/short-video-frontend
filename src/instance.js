import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'ngrok-skip-browser-warning': 'true',
  },
});

export const instanceWToken = axios.create({
  baseURL: BASE_URL,
  headers: {
    'ngrok-skip-browser-warning': 'true',
  },
});
instanceWToken.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instanceWToken.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const refresh_token = localStorage.getItem('refresh_token');
    const access_token = localStorage.getItem('access_token');
    if (!refresh_token) {
      return Promise.reject(error);
    }
    const originalRequest = error.config;
    if (error.response.status === 401 || error.response.status === 403) {
      try {
        const response = await instance.post('token/refresh', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          refresh: refresh_token,
        });

        if (response.status === 200) {
          localStorage.setItem('access_token', response.data.access);
          return instanceWToken(originalRequest);
        }
      } catch (err) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        return Promise.reject(error);
      }
    }
  },
);
export default instance;
