import { h, Component } from 'preact';
import { NavLink } from 'react-router-dom';

import { version } from '../../../../../package.json';

import Icon from '../icon/icon.js';

import style from './footer.scss';

export default class Home extends Component {
    render() {
        return (
                <div class={`${style.footer}`}>
                    <p class="flex flex-full-center">Version {version} &nbsp;&nbsp;&nbsp;&nbsp;<Icon iconName="twitter" />&nbsp;<a href="https://twitter.com/nethruster" rel="noopener" target="_blank">@nethruster</a>&nbsp;&nbsp;&nbsp;&nbsp;<NavLink to="/login" activeClassName="dom-hidden" >Login</NavLink></p>
                </div>
        );
    }
}
