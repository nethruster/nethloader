import { h, render } from 'preact';

import asyncComponent from 'asyncComponent';

if (module.hot) {
    require('preact/debug');
}

let App = asyncComponent(() => import(/* webpackChunkName: "app" */'./app/app.js').then(module => module.default));

const mountPoint = document.getElementById('nethloader');

render(<App />, mountPoint, mountPoint.lastChild);
