const fs = require('fs');
const path = require('path');

const getEnv = require('./get-env');

let env = getEnv();

const config = (JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "..", "..", "config.json"),
    'utf8'
  )
))[env];

config.env = env;

if (process.env.PORT) {
  config.port = process.env.PORT;
}

module.exports = config;
