const verifyLogin = require('../utils/verify-login');

module.exports = async function(req) {
  const token = req.headers['authentication'];
  if(token) {
    try {
      req.user = await verifyLogin(token);
    }
    catch(err) {
      req.user = null;
    }
  } else {
    req.user = null;
  }

  req.next();
}
