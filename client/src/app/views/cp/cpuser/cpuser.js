import { h, Component } from 'preact'

import style from './cpuser.scss'

export default class CPUser extends Component {
  render () {
    return (
      <div class={`${style.usercp} flex flex-dc`}>
        <p>UserCP</p>
      </div>
    )
  }
}
