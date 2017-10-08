import { h, Component } from 'preact'

import style from './media-item.scss'

export default class MediaItem extends Component {
  render () {
    const testUrl = 'https://images.unsplash.com/photo-1472152083436-a6eede6efad9?dpr=1&auto=compress,format&fit=crop&w=1049&h=&q=80&cs=tinysrgb&crop='
    return (
      <div class={`${style.mediaItem}`}>
        <img src={testUrl} alt='Screenshot/image' />
      </div>
    )
  }
}
