import { h, Component } from 'preact'

import Button from '../../shared/button/button.js'

import style from './media-info.scss'
import '../../shared/paper/paper.scss'

export default class MediaInfo extends Component {
  render () {
    const testUrl = 'https://images.unsplash.com/photo-1472152083436-a6eede6efad9?dpr=1&auto=compress,format&fit=crop&w=1049&h=&q=80&cs=tinysrgb&crop='
    return (
      <div class={`paper paper-small ${style.mediaInfo} flex flex-dc`}>
        <div class={`${style.mediaInfoButtons} flex flex-sa`}>
          <a href={testUrl} target='_blank' rel='noopener'><Button text='View original' small icon='fullscreen' /></a>
          <a href={testUrl} download rel='noopener'><Button text='Download' small icon='download' /></a>
        </div>
        <p>Image info</p>
      </div>
    )
  }
}
