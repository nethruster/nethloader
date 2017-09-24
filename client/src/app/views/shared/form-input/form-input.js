import { h, Component } from 'preact';

import style from './form-input.scss';

export default class LoginForm extends Component {
    render() {
        return (
           <div class="input-container">
                <input class={style.inputClass} type={this.props.inputType} placeholder={this.props.inputLabel} />
           </div>
        );
    }
}
