import { h, Component } from 'preact';

import Spinner from './../spinner/spinner.js';

import style from './view-loading.scss';
import paperStyle from '../paper/paper.scss';

export default class ViewLoading extends Component {
    render() {
        return (
            <div class={`${style.loading} paper flex flex-full-center`}>
                <Spinner />
            </div>
        );
    }
}
