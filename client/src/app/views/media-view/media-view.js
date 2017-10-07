import { h, Component } from 'preact'

import MediaItem from './media-item/media-item.js'
import MediaInfo from './media-info/media-info.js'

import style from './media-view.scss'

export default class MediaView extends Component {
  render () {
    return (
      <div class={`${style.mediaView} flex flex-full-center`}>
        <div class={`${style.mediaViewWrapper} flex flex-dc flex-full-center`}>
          <MediaItem />
          <MediaInfo />
        </div>
      </div>
    )
  }
}
