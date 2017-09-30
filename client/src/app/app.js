import { h, Component } from 'preact';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// import Loading from './views/shared/view-loading/view-loading.js';
import asyncComponent from './asyncComponent';

import style from './app.scss';

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route
                        exact
                        path='/'
                        component={ asyncComponent(() => import(/* webpackChunkName: "home" */'./views/home/home.js')
                                    .then(module => module.default)) } />

                    <Route
                        exact
                        path='/login'
                        component={ asyncComponent(() => import(/* webpackChunkName: "login" */'./views/login/login.js')
                                    .then(module => module.default)) } />

                    <Route
                        path='/:id'
                        component={ asyncComponent(() => import(/* webpackChunkName: "media-view" */'./views/media-view/media-view.js')
                                    .then(module => module.default)) } />
                </Switch>
            </BrowserRouter>
        );
    }
}
