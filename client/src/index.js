import { h, render } from 'preact';

// this holds our rendered root element so we can re-render in response to HMR updates
let root;

// Making our app's initialization a function means it's repeatable
function init() {
    // HMR requires this to be a require()
    let App = require('./components/app').default;

    // render the app and save the new root element:
    root = render(<App />, document.getElementById('nethloader'), root);
}

// initial render
init();

// If this is webpack-dev-server, set up HMR
if (module.hot) module.hot.accept('./components/app', init);
