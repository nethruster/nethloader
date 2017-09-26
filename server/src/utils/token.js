const jwt = require('jsonwebtoken');

const config = require('./config');

function verify(token) {
  return new Promise((resolve, reject) =>{
    jwt.verify(token, config["jwt-key"], (err, decoded) => {
      if(err) {
        return reject(err)
      }
      return resolve(decoded)
    });
  });
}

function sign(data, expiresIn) {
  return new Promise((resolve, reject) => {
    const options = {};
    if(expiresIn) {
      options.expiresIn = expiresIn
    }
    jwt.sign(
      data,
      config["jwt-key"],
      options,
      (err, token) => {
        if(err) {
          return reject(err);
        }
        return resolve(token);
      }
    )
  });
}

function generateUserToken(user, expiresIn) {
  return sign(
    {
      id: user.id,
      sessionSignature: user.sessionSignature,
      isAdmin: user.isAdmin
    },
    expiresIn
  )
}

module.exports = {
  verify,
  sign,
  generateUserToken
}
