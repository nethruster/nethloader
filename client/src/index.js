import { h, render } from 'preact';

import asyncComponent from './app/asyncComponent.js';

let App = asyncComponent(() => import(/* webpackChunkName: "app" */'./app/app.js').then(module => module.default));

const mountPoint = document.getElementById('nethloader');

render(<App />, mountPoint, mountPoint.lastChild);
