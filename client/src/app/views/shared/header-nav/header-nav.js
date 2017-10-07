import { h, Component } from 'preact'

import style from './header-nav.scss'

export default class HeaderNav extends Component {
  render () {
    return (
      <div class={`${style.headerNav} flex flex-cross-center`} />
    )
  }
}
