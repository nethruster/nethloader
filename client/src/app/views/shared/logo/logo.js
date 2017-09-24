import { h, Component } from 'preact';

import style from './logo.scss';

export default class Logo extends Component {
    render() {
        return (
            <div class={style.logo}>
                <img src="./assets/img/logo.svg" />
            </div>
        );
    }
}
