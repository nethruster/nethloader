import { h, Component } from 'preact';

import FormInput from './../../shared/form-input/form-input.js';
import Button from '../../shared/button/button.js';

import style from './login-form.scss';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <form class={`${style.form} flex flex-full-center flex-dc`}>
                <FormInput inputType="text" inputLabel="Email" />
                <FormInput inputType="password" inputLabel="Password" />
                <Button text="Login"/>
            </form>
        );
    }
}
