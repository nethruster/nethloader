import { h, Component } from 'preact';
import { Switch, Route } from 'react-router-dom';

import asyncComponent from 'asyncComponent';
import HeaderNav from '../header-nav/header-nav.js';

import style from './content.scss';

export default class Content extends Component {
    render() {
        return (
            <div class={ `${ style.content } flex flex-dc` }>
                <HeaderNav />
                <Switch>
                    <Route
                        path='/:id'
                        component={ asyncComponent(() => import(/* webpackChunkName: "content_media-view" */'../../media-view/media-view.js')
                                    .then(module => module.default)) } />
                </Switch>
            </div>
        );
    }
}
