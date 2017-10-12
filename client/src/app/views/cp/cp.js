import { h, Component } from 'preact'

import CPSubheader from './cpsubheader/cpsubheader.js'
import CPUser from './cpuser/cpuser.js'

import style from './cp.scss'

export default class ControlPanel extends Component {
  render () {
    return (
      <div class={`${style.usercp} flex flex-dc`}>
        <CPSubheader />
        <div>
          <CPUser />
        </div>
      </div>
    )
  }
}
