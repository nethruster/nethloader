import { h, Component } from 'preact';

import Logo from '../logo/logo.js';

import style from './header-nav.scss';

export default class HeaderNav extends Component {
    render() {
        return (
            <div class={`${style.headerNav} flex flex-cross-center`}>
                <div class="flex flex-cross-center">
                    <Logo customClass={`${style.headerNavLogo} flex flex-cross-center`} />
                    <p class={style.headerNavLogoTitle}>Nethloader</p>
                </div>
            </div>
        );
    }
}
