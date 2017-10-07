import { h, Component } from 'preact'

import Spinner from './../spinner/spinner.js'

import style from './view-loading.scss'

export default class ViewLoading extends Component {
  render () {
    return (
      <div class={`${style.loading}`}>
        <Spinner />
      </div>
    )
  }
}
