import jwtDecode from 'jwt-decode'

import { apiBaseUrl } from 'app.config'

// RegEx to make sure that the email is valid
const emailExp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i

const validateForm = function (email, password) {
  if (!email) {
    throw Error('The email field is empty')
  } else if (!emailExp.test(email)) {
    throw Error('That email is not valid')
  } else if (!password) {
    throw Error('The password field is empty')
  }
}

const requestLogin = async function (email, password) {
  // Remove possible whitespace on the email
  email = email.trim()

  // Validate form data before trying to log in
  validateForm(email, password)

  try {
    let loginResponse = await login(email, password)
    return loginResponse
  } catch (err) {
    console.log(err)
    throw Error('Something went wrong while trying to log in')
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
