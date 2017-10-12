import { h, Component } from 'preact'

import style from './header-nav.scss'

export default class HeaderNav extends Component {
  render () {
    return (
      <header class={`${style.headerNav} flex flex-cross-center`} role='menubar' />
      // TODO: add new logo and login check login then show some item menus or others.
    )
  }
}
