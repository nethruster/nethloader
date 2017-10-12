import { h, Component } from 'preact'

import style from './cpsubheader.scss'

export default class CPSubheader extends Component {
  render () {
    return (
      <div class={`${style.cpsubheader} flex flex-main-center`}>
        <div class={`${style.cpsubheaderWrapper} flex flex-cross-center flex-sb`}>
          <div class={style.cpsubheaderUserStats}>
            <p>Elisa</p>
            <p>15 uploads</p>
          </div>
          <div class={`${style.cpsubheaderTabs} flex flex-cross-center`}>
            <nav class='flex flex-cross-center flex-sa'>
              <a class='flex flex-full-center'>Uploads</a>
              <a class='flex flex-full-center'>Settings</a>
              <a class='flex flex-full-center'>Admin Settings</a>
            </nav>
          </div>
        </div>
      </div>
    )
  }
}
