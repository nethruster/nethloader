import { h, Component } from 'preact'

import Button from '../shared/button/button.js'

import style from './media-view.scss'

export default class MediaView extends Component {
  render ({ match }) {
    const testUrl = ''
    return (
      <div class={`${style.mediaView} flex flex-full-center`}>
        <div class={`${style.mediaViewWrapper} flex flex-dc flex-full-center`}>
          <div class={style.mediaViewImage}>
            <img src={testUrl} />
          </div>
          <div class={`${style.mediaViewInfo} flex flex-dc`}>
            <div class={`${style.mediaViewButtons} flex flex-sa`}>
              <a href={testUrl} target='_blank' rel='noopener'><Button text='View original' small icon='fullscreen' /></a>
              <a href={testUrl} download rel='noopener'><Button text='Download' small icon='download' /></a>
            </div>
            <p>Image info</p>
          </div>
        </div>
      </div>
    )
  }
}
