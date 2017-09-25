import { h, Component } from 'preact';

import FormInput from './../../shared/form-input/form-input.js';
import Button from '../../shared/button/button.js';

import style from './login-form.scss';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <form class={`${style.form} flex flex-full-center flex-dc`} onSubmit={this.handleSubmit}>
                <FormInput inputId="email" inputType="email" inputLabel="Email" changeHandler={this.handleChange} required />
                <FormInput inputId="password" inputType="password" inputLabel="Password" changeHandler={this.handleChange} required />
                <Button text="Login" />
            </form>
        );
    }
}
