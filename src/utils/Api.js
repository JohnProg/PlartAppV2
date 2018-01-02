// const API_URL = 'https://achambear.pe/api';
const API_URL = 'http://0.0.0.0:3000/api';

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

// fetch logger
global._fetch = fetch;
global.fetch = function (uri, options, ...args) {
  return global._fetch(uri, options, ...args).then((response) => {
    console.log('Fetch', { request: { uri, options, ...args }, response });
    return response;
  });
};

function getData(url, token = '') {
  const headers = {};
  if (token) {
    headers.Authorization = `JWT ${token}`;
  }
  return fetch(`${API_URL}${url}`, { headers })
    .then((response) => {
      const json = response.json();
      if (response.status >= 200 && response.status < 300) {
        return json;
      }
      return json.then(Promise.reject.bind(Promise));
    });
}

function postData(url, data, method = 'POST') {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  if (data.token) {
    headers.Authorization = `JWT ${data.token}`;
  }
  return fetch(`${API_URL}${url}`, {
    method,
    headers,
    body: JSON.stringify(data),
  })
    .then((response) => {
      const json = response.json();
      if (response.status >= 200 && response.status < 300) {
        return json;
      }
      return json.then(Promise.reject.bind(Promise));
    });
}

export default {
  getProfile(token) {
    return getData('/me/', token);
  },
  registerUser(user) {
    return postData('/user/', user);
  },
  authWithPassword(user) {
    return postData('/api-token-auth/', user);
  },
  authWithToken(token) {
    return postData('/api-token-verify/', { token });
  },
  postSaveProfessions(data) {
    return postData('/me/step_1/', data, 'PUT');
  },
  postSavePersonalInfo(data) {
    return postData('/me/step_2/', data, 'PUT');
  },
  postCreateAd(data) {
    return postData('/advertisement/', data, 'POST');
  },
  updatePersonalInfo(data) {
    return postData('/me/update_profile/', data, 'PUT');
  },
  updatePersonalAvatar(data) {
    return postData('/me/update_picture/', data, 'PUT');
  },
  updatePersonalCoverPhoto(data) {
    return postData('/me/update_photo_front/', data, 'PUT');
  },
  getMyAdvertisements(token) {
    return getData('/me/get_advertisement/', token);
  },
  getProfessions() {
    return getData('/professions/');
  },
  getNotifications(token) {
    return getData('/notifications/', token);
  },
  getUserPublicProfileData(token) {
    return getData('/other-users/', token);
  },
  getLocations(token) {
    return getData('/locations/', token);
  },
  getAdvertisements(token) {
    return getData('/advertisement/', token);
  },
  postApplyAdvertisement(token, url) {
    return getData(url, token);
  },
  postDeclineAdvertisement(token, url) {
    return getData(url, token);
  },
};
