import { h, Component } from 'preact';

import HeaderNav from '../shared/header-nav/header-nav.js';

import style from './media-view.scss';

export default class MediaView extends Component {
    render({ match }) {
        return (
            <div>
                <HeaderNav />
                <h1>Media standalone view {match.params.id}</h1>
            </div>
        );
    }
}
