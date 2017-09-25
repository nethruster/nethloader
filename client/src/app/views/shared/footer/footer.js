import { h, Component } from 'preact';
import { Link } from 'preact-router/match';

import { version } from '../../../../../package.json';

import Icon from '../icon/icon.js';

import style from './footer.scss';

export default class Home extends Component {
    render() {
        return (
                <div class={`${style.footer}`}>
                    <p class="flex flex-full-center">Version {version} &nbsp;&nbsp;&nbsp;&nbsp;<Icon iconName="twitter" />&nbsp;<a href="https://twitter.com/nethruster" rel="noopener" target="_blank">@nethruster</a>&nbsp;&nbsp;&nbsp;&nbsp;<Link activeClassName="dom-hidden" href="/login">Login</Link></p>
                </div>
        );
    }
}
