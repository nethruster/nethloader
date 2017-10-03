import { h, Component } from 'preact';

import Button from '../shared/button/button.js';

import style from './media-view.scss';

export default class MediaView extends Component {
    render({ match }) {
        return (
            <div class={`${ style.mediaView } flex flex-full-center`}>
                <div class={`${ style.mediaViewWrapper } flex flex-dc flex-full-center`}>
                    <div class={ style.mediaViewImage }>
                        <img src="" />
                    </div>
                    <div class={`${ style.mediaViewInfo } flex flex-dc`}>
                        <div class={`${ style.mediaViewButtons } flex flex-sa`}>
                            <Button text="View full size" small icon="fullscreen" />
                            <Button text="Download" small icon="download" />
                        </div>
                        <p>Image info</p>
                    </div>
                </div>
            </div>
        );
    }
}
