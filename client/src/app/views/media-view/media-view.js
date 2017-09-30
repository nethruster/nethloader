import { h, Component } from 'preact';

import style from './media-view.scss';

export default class MediaView extends Component {
    render({ match }) {
        return (
            <div class={`${ style.mediaView } flex flex-dc flex-cross-center`}>
                <div class={ style.mediaViewImage }>
                    <img src="" />
                </div>
            </div>
        );
    }
}
