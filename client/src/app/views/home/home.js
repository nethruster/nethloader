import { h, Component } from 'preact';
import { Link } from 'preact-router/match';

import Button from '../shared/button/button.js';
import Logo from '../shared/logo/logo.js';
import Icon from '../shared/icon/icon.js';

import style from './home.scss';

export default class Home extends Component {
    render() {
        return (
            <div class={`${style.home} flex flex-full-center flex-dc`}>
                <div class="flex flex-cross-center flex-dc">
                    <Logo />
                    <p class={`${style.homeText} ta-c`}>This domain is using Nethloader, a <br /> self hosted media sharing service.</p>
                </div>
                <div class={`${style.homeButtons} flex flex-full-center flex-sa`}>
                    <a href="" rel="noopener" target="_blank"><Button big text="More info"/></a>
                    <a href="https://github.com/nethruster/nethloader" rel="noopener" target="_blank"><Button big transparent text="Github"/></a>
                </div>
                <div class={`${style.homeLinks}`}>
                    <p class="flex flex-full-center">Version 0.1.0&nbsp;&nbsp;&nbsp;&nbsp;<Icon iconName="twitter" />&nbsp;<a href="https://twitter.com/nethruster" rel="noopener" target="_blank">@nethruster</a>&nbsp;&nbsp;&nbsp;&nbsp;<Link href="/login">Login</Link></p>
                </div>
            </div>
        );
    }
}
