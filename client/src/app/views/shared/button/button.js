import { h, Component } from 'preact'

import style from './button.scss'
import Icon from '../icon/icon.js'
import Spinner from '../spinner/spinner.js'

export default class Button extends Component {
  render () {
    return (
      <button
        class={`${style.button}
              ${this.props.round ? style.buttonRound : ''}
              ${this.props.contrast ? style.buttonContrast : ''}
              ${this.props.big ? style.buttonBig : ''}
              ${this.props.small ? style.buttonSmall : ''}
              ${this.props.transparent ? style.buttonTransparent : ''}
              flex flex-full-center` }
        tabindex={this.props.tabindex}>
        {this.props.icon ? <Icon iconName={this.props.icon} /> : null}&nbsp;
        {this.props.spinner ? <Spinner color={this.props.spinnerColor} size={this.props.spinnerSize} /> : this.props.text}&nbsp;
      </button>
    )
  }
}
