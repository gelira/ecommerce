import axios from 'axios';

export default function api(token = '') {
  const config = {
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10 * 1000
  };

  if (token) {
    config.headers = {
      Authorization: `JWT ${token}`
    };
  }

  return axios.create(config);
}
