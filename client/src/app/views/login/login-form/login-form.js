import { h, Component } from 'preact'
import {withRouter} from 'react-router-dom'

import FormInput from './../../shared/form-input/form-input.js'
import Button from '../../shared/button/button.js'

import style from './login-form.scss'

import { requestLogin } from 'login/login-manager'

import locale from 'locale'

const viewStrings = locale.login.form

export default withRouter(class LoginForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      loggingIn: false,
      formValidationText: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({
      [event.target.id]: event.target.value,
      formValidationText: ''
    })
  }

  async handleSubmit (event) {
    event.preventDefault()
    this.setState({loggingIn: true})

    try {
      await requestLogin(this.state.email, this.state.password).then((result) => {
        this.props.history.push('/randomroute')
        this.setState({
          loggingIn: false,
          formValidationText: ''
        })
      })
    } catch (err) {
      this.setState({
        loggingIn: false,
        formValidationText: err.message
      })
    }
  }

  render () {
    return (
      <form class={`${style.form} flex flex-full-center flex-dc`} onSubmit={this.handleSubmit}>
        <FormInput inputId='email' inputType='email' inputLabel={viewStrings.email} changeHandler={this.handleChange} required noValidationStyle />
        <FormInput inputId='password' inputType='password' inputLabel={viewStrings.password} changeHandler={this.handleChange} required noValidationStyle />
        <p class={style.formValidationText}>{this.state.formValidationText}</p>
        <Button contrast text={viewStrings.login} spinner={this.state.loggingIn} spinnerColor='#fff' spinnerSize='14' />
      </form>
    )
  }
})
