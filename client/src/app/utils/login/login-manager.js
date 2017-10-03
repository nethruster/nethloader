import jwtDecode from 'jwt-decode';

import { apiBaseUrl } from 'app.config';

const requestLogin = async function (email, password) {
  // Test and check
  return await login(email, password);
}

const login = async function (email, password) {
  return await fetch(apiBaseUrl, {
    method: 'post',
    body: JSON.stringify({
    query: `mutation{ login(email: "${email}", password: "${password}") }`
    }),
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json'
    }
  }).then(async (response) => {
    if (response.status >= 200 && response.status < 300) {
      let token = (await response.json()).data.login
      return jwtDecode(token);
    }
  });
}

export {
  requestLogin
}
