import jwtDecode from 'jwt-decode'

import { apiBaseUrl } from 'app.config'

const requestLogin = async function (email, password) {
  // Remove possible whitespace on the email
  email = email.trim()

  // RegEx to make sure that the email is valid
  let emailExp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i

  if (!email) {
    // Check if email is empty
    throw Error('no_email')
  } else if (!emailExp.test(email)) {
    // Check if email is valid
    throw Error('invalid_email')
  } else if (!password) {
    // Chack if there's a password
    throw Error('no_password')
  } else {
    // Any error trown from here on down will be passed upwards and catched in the login-form component to represent it correctly
    let loginResponse = await login(email, password)
    return loginResponse
  }
}

const login = async function (email, password) {
  await fetch(apiBaseUrl, {
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
      return jwtDecode(token)
    } else {
      throw Error(response.status)
    }
  })
}

export {
  requestLogin
}
