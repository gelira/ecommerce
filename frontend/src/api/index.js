import axios from 'axios';

export default function api(token = null, loja_id = null) {
  const config = {
    baseURL: process.env.REACT_APP_API_URL || window.location.origin,
    timeout: 10 * 1000
  };

  if (token) {
    config.headers = {
      Authorization: `JWT ${token}`
    };
  }

  if (loja_id) {
    config.params = { loja_id };
  }

  return axios.create(config);
}
