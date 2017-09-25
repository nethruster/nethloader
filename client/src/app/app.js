import { h, Component } from 'preact';
import Router from 'preact-router';
import AsyncRoute from 'preact-async-route';

import Loading from './views/shared/view-loading/view-loading.js';

import style from './app.scss';

export default class App extends Component {
    render() {
        return (
            <Router>
                <AsyncRoute
                    path="/"
                    getComponent={ () => import(/* webpackChunkName: "home" */'./views/home/home.js').then(module => module.default) }
                    loading={ () => <Loading /> }
                    />
                <AsyncRoute
                    path="/login"
                    getComponent={ () => import(/* webpackChunkName: "login" */'./views/login/login.js').then(module => module.default) }
                    loading={ () => <Loading /> }
                    />
            </Router>
        );
    }
}
