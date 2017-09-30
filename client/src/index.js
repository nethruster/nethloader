import { h, render } from 'preact';
// import { initDevTools } from 'preact/devtools';

import asyncComponent from './app/asyncComponent.js';

let App = asyncComponent(() => import(/* webpackChunkName: "app" */'./app/app.js').then(module => module.default));

render(<App />, document.getElementById('nethloader'));
