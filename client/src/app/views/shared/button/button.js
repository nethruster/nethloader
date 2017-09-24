import { h, Component } from 'preact';

import style from './button.scss';

export default class Button extends Component {
    render() {
        return (
            <div
            class={`${style.button}
                    ${this.props.round ? style.buttonRound : ''}
                    ${this.props.big ? style.buttonBig : ''}
                    ${this.props.transparent ? style.buttonTransparent : ''}
                    flex flex-full-center`}
            tabindex="0">
                {this.props.text}
            </div>
        );
    }
}
