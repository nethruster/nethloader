import { h, Component } from 'preact';

import style from './button.scss';

export default class Button extends Component {
    render() {
        return (
            <div
            class={`${style.Button}
                    ${this.props.noRound ? style.ButtonNoRound : ''}
                    ${this.props.big ? style.ButtonBig : ''}
                    ${this.props.transparent ? style.ButtonTransparent : ''}
                    flex flex-full-center`}
            tabindex="0">
                {this.props.text}
            </div>
        );
    }
}
