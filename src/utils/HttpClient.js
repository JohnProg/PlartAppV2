import axios from 'axios';

const API_URL = 'https://achambear.pe/api/';
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

// fetch logger
global._fetch = fetch;
global.fetch = function (uri, options, ...args) {
  return global._fetch(uri, options, ...args).then((response) => {
    console.log('Fetch', { request: { uri, options, ...args }, response });
    return response;
  });
};

export default class HttpClient {
  static get(dispatch, type, url) {
    return dispatch({
      type,
      payload: axios.get(`${API_URL}${url}`),
    });
  }

  static delete(dispatch, type, url) {
    return dispatch({
      type,
      payload: axios.delete(`${API_URL}${url}`),
    });
  }

  static post(data, dispatch, type, url) {
    return dispatch({
      type,
      payload: axios.post(`${API_URL}${url}`, data),
    });
  }

  static put(data, dispatch, type, url) {
    return dispatch({
      type,
      payload: axios.put(`${API_URL}${url}`, data),
    });
  }
}
