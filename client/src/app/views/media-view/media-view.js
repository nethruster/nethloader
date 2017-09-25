import { h, Component } from 'preact';

import style from './media-view.scss';

export default class MediaView extends Component {
    render({ match }) {
        return (
            <div>
                <h1>Media standalone view {match.params.id}</h1>
            </div>
        );
    }
}
