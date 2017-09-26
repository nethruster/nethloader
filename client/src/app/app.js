import { h, Component } from 'preact';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Loading from './views/shared/view-loading/view-loading.js';
import asyncComponent from './asyncComponent';

const Home = asyncComponent(() => import(/* webpackChunkName: "home" */'./views/home/home.js')
                .then(module => module.default));

const Login = asyncComponent(() => import(/* webpackChunkName: "login" */'./views/login/login.js')
                .then(module => module.default));

const MediaView = asyncComponent(() => import(/* webpackChunkName: "media-view" */'./views/media-view/media-view.js')
                .then(module => module.default));

import style from './app.scss';

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Home} />

                    <Route exact path='/login' component={Login} />

                    <Route path='/:id' component={MediaView} />
                </Switch>
            </BrowserRouter>
        );
    }
}
