import fs from 'fs';
import path from 'path';

import getEnv from "./get-env";

let env = getEnv();

const config = (JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "..", "..", "config.json"),
    'utf8'
  )
))[env];

config.env = env;

export default config;
