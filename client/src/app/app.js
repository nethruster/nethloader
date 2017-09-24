import { h, Component } from 'preact';
import Router from 'preact-router';
import AsyncRoute from 'preact-async-route';

import Home from './views/home/home.js';

import style from './app.scss';

export default class App extends Component {
    render() {
        return (
            <Router>
                <Home path="/" />
                <AsyncRoute
                    path="/register"
                    component={ () => import('./views/register/register.js').then(module => module.default) }
                    loading={ () => <div>loading...</div> }
                />
            </Router>
        );
    }
}
