import { h, Component } from 'preact';
import {withRouter} from 'react-router-dom';

import FormInput from './../../shared/form-input/form-input.js';
import Button from '../../shared/button/button.js';

import style from './login-form.scss';

import { requestLogin } from '../../../utils/login/login-manager.js';

export default withRouter(class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loggingIn: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({loggingIn: true});

    requestLogin(this.state.email, this.state.password).then((result) => {
      this.props.history.push("/randomroute");
      this.setState({loggingIn: false});
    });
  }

  render() {
    return (
      <form class={`${style.form} flex flex-full-center flex-dc`} onSubmit={this.handleSubmit}>
        <FormInput inputId="email" inputType="text" inputLabel="Email" changeHandler={this.handleChange} noValidationStyle />
        <FormInput inputId="password" inputType="password" inputLabel="Password" changeHandler={this.handleChange} noValidationStyle />
        <Button contrast text="Login" spinner={this.state.loggingIn} spinnerColor="#fff" spinnerSize="14" />
      </form>
    );
  }
})
