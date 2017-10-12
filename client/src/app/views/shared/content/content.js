import { h, Component } from 'preact'
import { Switch, Route } from 'react-router-dom'

import asyncComponent from 'asyncComponent'
import HeaderNav from '../header-nav/header-nav.js'

import style from './content.scss'

export default class Content extends Component {
  render () {
    return (
      <div class={`${style.content} flex flex-dc`} role='main'>
        <HeaderNav />
        <Switch>
        <Route
            path='/cp'
            component={asyncComponent(() => import(/* webpackChunkName: "content_cp" */'../../cp/cp.js')
              .then(module => module.default))} />
          <Route
            path='/:id'
            component={asyncComponent(() => import(/* webpackChunkName: "content_media-view" */'../../media-view/media-view.js')
              .then(module => module.default))} />
        </Switch>
      </div>
    )
  }
}
