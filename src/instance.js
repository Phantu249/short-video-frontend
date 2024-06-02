import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';
const LOCAL_URL = 'http://192.168.0.100:8000/api';
const ZROK_URL = 'https://kcznj4y38eax.share.zrok.io/api';
const URL = 'https://short-video-backend-piaz.onrender.com/api';
export const WS_URL = (URL.split('/')[0] === 'http:' ? 'ws://' : 'wss://') + URL.split('/')[2] + '/ws/';

const instance = axios.create({
  baseURL: URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

export const instanceWToken = axios.create({
  baseURL: URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
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

    if (originalRequest._retry) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      return Promise.reject(error);
    }

    if (error.response.status === 401) {
      originalRequest._retry = true;
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
