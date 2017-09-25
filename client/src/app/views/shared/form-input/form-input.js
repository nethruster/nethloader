import { h, Component } from 'preact';

import style from './form-input.scss';

export default class FormInput extends Component {
    render() {
        return (
           <div class="input-container">
                <input id={this.props.inputId}
                    class={style.inputClass}
                    type={this.props.inputType}
                    placeholder={this.props.inputLabel}
                    required={this.props.required}
                    onInput={this.props.changeHandler}
                    />
           </div>
        );
    }
}
