import { h, Component } from 'preact';
import Router from 'preact-router';

import Home from './views/home/home.js';
import Register from './views/register/register.js';

import style from './app.scss';

export default class App extends Component {
    render() {
        return (
            <Router>
                <Home path="/" />
                <Register path="/register" />
            </Router>
        );
    }
}
