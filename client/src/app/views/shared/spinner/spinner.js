import { h, Component } from 'preact';

import style from './spinner.scss';

export default class Spinner extends Component {
    render() {
        return (
            <div class="spinner">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" style={{ maxWidth: this.props.size }}>
                    <circle style={{ stroke: this.props.color }} fill="none" cx="15" cy="15" r="14"></circle>
                </svg>
            </div>
        );
    }
}
