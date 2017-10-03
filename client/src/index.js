import { h, render } from 'preact';
import { initDevTools } from 'preact/devtools';

import asyncComponent from 'asyncComponent';

let App = asyncComponent(() => import(/* webpackChunkName: "app" */'./app/app.js').then(module => module.default));

const mountPoint = document.getElementById('nethloader');

render(<App />, mountPoint, mountPoint.lastChild);
