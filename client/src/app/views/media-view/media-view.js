import { h, Component } from 'preact';
import { route } from 'preact-router';

import style from './media-view.scss';

export default class MediaView extends Component {
    render({id}) {
        return (
            <div>
                <h1>Media standalone view {String(id == '')}</h1>
            </div>
        );
    }
}
